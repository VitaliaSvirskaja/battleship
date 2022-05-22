import { Ship } from "./Ship";
import { Coordinate } from "./Coordinate";

type ShipWithSection = { ship: Ship; shipSection: number };
type StringifiedCoordinate = string;

export class Gameboard {
  get missedShots(): Array<Coordinate> {
    return this._missedShots.map((c) => JSON.parse(c));
  }
  get hitShots(): Array<Coordinate> {
    return this._hitShots.map((c) => JSON.parse(c));
  }

  // TODO  Erstellung der Axen mit Buchstaben und Ziffern
  private readonly gameboard: Array<Array<any>>;
  private readonly _missedShots: Array<StringifiedCoordinate> = [];
  private readonly _hitShots: Array<StringifiedCoordinate> = [];
  private readonly placedShips: Map<StringifiedCoordinate, ShipWithSection> =
    new Map();

  constructor(size: number = 10) {
    if (size < 1) {
      throw new Error("Gameboard can't be smaller than one field!");
    }
    this.gameboard = new Array(size);
    this.gameboard.fill(new Array(size));
  }

  placeShip(ship: Ship, coordinate: Coordinate) {
    const { y, x } = coordinate;
    const size = this.gameboard.length;
    if (x + ship.length > size || y + ship.length > size) {
      throw new Error("The ship is placed outside the gameboard!");
    }

    for (let i = 0; i < ship.length; i++) {
      const newCoordinate: Coordinate = {
        x: coordinate.x + i,
        y: coordinate.y,
      };
      if (this.placedShips.has(JSON.stringify(newCoordinate))) {
        throw new Error("The ship can't be placed over each other!");
      }
      this.placedShips.set(JSON.stringify(newCoordinate), {
        ship: ship,
        shipSection: i,
      });
    }
  }

  receiveAttack(coordinate: Coordinate): void {
    const { y, x } = coordinate;
    const size = this.gameboard.length;
    if (x >= size || y >= size || x < 0 || y < 0) {
      throw new Error("Your attack is outside the gameboard!");
    }
    const stringifiedCoordinates = JSON.stringify(coordinate);
    if (this.placedShips.has(stringifiedCoordinates)) {
      this._hitShots.push(stringifiedCoordinates);
      const shipAtCoordinate = this.placedShips.get(stringifiedCoordinates);
      if (!shipAtCoordinate) {
        throw new Error("There is no ship at this coordinate!");
      }
      shipAtCoordinate.ship.hit(shipAtCoordinate.shipSection);
    } else if (this._missedShots.includes(stringifiedCoordinates)) {
      throw new Error("You already missed this field!");
    } else {
      this._missedShots.push(stringifiedCoordinates);
    }
  }
}
