import { describe, it, expect } from "vitest";
import { Ship } from "./Ship";

describe("Ship", () => {
  it("should sink a ship with length one", () => {
    const ship = new Ship(1);
    ship.hit(0);
    expect(ship.isSunk()).toBeTruthy();
  });

  it("should sink a ship with length two", () => {
    const ship = new Ship(2);
    ship.hit(0);
    expect(ship.isSunk()).toBeFalsy();
    ship.hit(1);
    expect(ship.isSunk()).toBeTruthy();
  });

  it("should throw an error if length of ship is smaller or equals 0", () => {
    expect(() => {
      new Ship(-3);
    }).toThrow("The ship's length can't be smaller than 1!");
  });

  it("should throw an error if an non existent section was hit", () => {
    const ship = new Ship(4);
    expect(() => {
      ship.hit(4);
    }).toThrow("This section doesn't exist!");
    expect(() => {
      ship.hit(-2);
    }).toThrow("This section doesn't exist!");
  });

  it("should throw an error if a hit section is hit again", () => {
    expect(() => {
      const ship = new Ship(3);
      ship.hit(2);
      ship.hit(2);
    }).toThrow("You already hit this section!");
  });
});
