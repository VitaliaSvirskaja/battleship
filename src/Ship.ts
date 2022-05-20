export class Ship {
  private readonly sections: Array<boolean>;

  constructor(public length: number) {
    if (length < 1) {
      throw new Error("The ship's length can't be smaller than 1!");
    }
    this.sections = new Array(length);
    this.sections.fill(false);
  }

  hit(shipSection: number): void {
    if (this.sections[shipSection]) {
      throw new Error("You already hit this section!");
    }
    if (shipSection >= this.sections.length || shipSection < 0) {
      throw new Error("This section doesn't exist!");
    }
    this.sections[shipSection] = true;
  }

  isSunk(): boolean {
    return this.sections.every((section): boolean => section);
  }
}
