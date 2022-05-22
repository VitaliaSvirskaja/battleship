import { describe, it, expect } from "vitest";
import { Ship } from "./Ship";
import { Gameboard } from "./Gameboard";

describe("Gameboard", () => {
  it("should place a ship at given coordinates", () => {
    const ship = new Ship(1);
    const gameboard = new Gameboard(3);
    gameboard.placeShip(ship, { x: 1, y: 1 });

    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 1, y: 1 });

    expect(gameboard.missedShots.length).toBe(1);
    expect(gameboard.missedShots[0]).toMatchObject({ x: 0, y: 0 });
    expect(gameboard.hitShots[0]).toMatchObject({ x: 1, y: 1 });
    expect(gameboard.hitShots.length).toBe(1);
    expect(ship.isSunk()).toBeTruthy();
  });

  it("should place a ship with a length of two at given coordinates", () => {
    const ship = new Ship(2);
    const gameboard = new Gameboard(3);
    gameboard.placeShip(ship, { x: 1, y: 1 });

    gameboard.receiveAttack({ x: 0, y: 0 });
    gameboard.receiveAttack({ x: 1, y: 1 });

    expect(gameboard.missedShots.length).toBe(1);
    expect(gameboard.missedShots[0]).toMatchObject({ x: 0, y: 0 });
    expect(gameboard.hitShots[0]).toMatchObject({ x: 1, y: 1 });
    expect(gameboard.hitShots.length).toBe(1);
    expect(ship.isSunk()).toBeFalsy();

    gameboard.receiveAttack({ x: 2, y: 1 });
    expect(gameboard.hitShots[1]).toMatchObject({ x: 2, y: 1 });
    expect(gameboard.hitShots.length).toBe(2);
    expect(ship.isSunk()).toBeTruthy();
  });

  it("should throw an error if coordinates of an ship are placed outside the gameboard", () => {
    const ship = new Ship(2);
    const gameboard = new Gameboard(3);

    expect(() => {
      gameboard.placeShip(ship, { x: 3, y: 3 });
    }).toThrow("The ship is placed outside the gameboard!");
  });

  it("should throw an error if the gameboard is initialized with a negative number", () => {
    expect(() => {
      new Gameboard(-3);
    }).toThrow("Gameboard can't be smaller than one field!");
  });

  it("should throw an error if coordinates of an attack are placed outside the gameboard", () => {
    const ship = new Ship(1);
    const gameboard = new Gameboard(3);
    gameboard.placeShip(ship, { x: 1, y: 1 });

    const message = "Your attack is outside the gameboard!";
    expect(() => gameboard.receiveAttack({ x: 3, y: 2 })).toThrow(message);
    expect(() => gameboard.receiveAttack({ x: 2, y: 4 })).toThrow(message);

    expect(() => gameboard.receiveAttack({ x: 4, y: 4 })).toThrow(message);
    expect(() => gameboard.receiveAttack({ x: -3, y: 2 })).toThrow(message);
    expect(() => gameboard.receiveAttack({ x: 2, y: -2 })).toThrow(message);
    expect(() => gameboard.receiveAttack({ x: -3, y: -2 })).toThrow(message);
  });

  it("should throw an error if a missed hit is hit again", () => {
    const ship = new Ship(1);
    const gameboard = new Gameboard(3);
    gameboard.placeShip(ship, { x: 1, y: 1 });

    expect(() => {
      gameboard.receiveAttack({ x: 0, y: 0 });
      gameboard.receiveAttack({ x: 0, y: 0 });
    }).toThrow("You already missed this field!");
  });

  it("should throw an error if a part of the placed ship would be outside the gameboard", () => {
    const ship = new Ship(2);
    const gameboard = new Gameboard(3);

    expect(() => {
      gameboard.placeShip(ship, { x: 2, y: 1 });
    }).toThrow("The ship is placed outside the gameboard!");
  });

  it("should throw an error if the placed ships would overlap each other", () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    const gameboard = new Gameboard(4);

    expect(() => {
      gameboard.placeShip(ship1, { x: 2, y: 1 });
      gameboard.placeShip(ship2, { x: 1, y: 1 });
    }).toThrow("The ship can't be placed over each other!");
  });
});
