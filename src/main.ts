import "./style.css";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Coordinate } from "./Coordinate";
//
// let playerTurn = true;
// const gameboardPlayer = new Gameboard(10);
// const playerCarrier = new Ship(5);
// const playerBattleship = new Ship(4)
// const playerCruiser = new Ship(3)
// const playerSubmarine = new Ship(3);
// const playerDestroyer = new Ship(2);
//
// gameboardPlayer.placeShip(playerCarrier, { x: 1, y: 1 });
// gameboardPlayer.placeShip(playerDestroyer, { x: 3, y: 4 });
// gameboardPlayer.shipIsHorizontal = false;
// gameboardPlayer.placeShip(playerSubmarine, { x: 1, y: 3 });
//
// let computerTurn = false;
// const gameboardComputer = new Gameboard(10);
// const computerCarrier = new Ship(5);
// const computerBattleship = new Ship(4)
// const computerCruiser = new Ship(3)
// const computerSubmarine = new Ship(3);
// const computerDestroyer = new Ship(2);
//
// gameboardPlayer.shipIsHorizontal = false;
// gameboardComputer.placeShip(computerCarrier, { x: 4, y: 1 });
// gameboardComputer.placeShip(computerSubmarine, { x: 1, y: 0 });
// gameboardComputer.placeShip(computerDestroyer, { x: 2, y: 4 });

//
// if (playerTurn) {
//     gameboardComputer.receiveAttack(coordinate:Coordinate)
//     playerTurn=false
//     computerTurn=true
// }
//
// if (computerTurn) {
//     gameboardPlayer.receiveAttack(coordinate:Coordinate)
//     computerTurn=false
//     playerTurn=true
// }
//

function initializeGameboard(field: HTMLDivElement) {
  for (let y = 1; y <= 10; y++) {
    for (let x = 1; x <= 10; x++) {
      const divElement = document.createElement("div");
      field?.appendChild(divElement);
      divElement.classList.add("element");
      divElement.addEventListener("click", () => {
        const coordinate: Coordinate = { x: x, y: y };
        if (gameboardPlayer.placedShips.has(JSON.stringify(coordinate))) {
          divElement.style.backgroundColor = "red";
        }
      });
      console.log("njeirho");
    }
  }
}

const playerGameboard = document.querySelector(
  "#playerGameboard"
) as HTMLDivElement;
initializeGameboard(playerGameboard);

const computerGameboard = document.querySelector(
  "#computerGameboard"
) as HTMLDivElement;
initializeGameboard(computerGameboard);

const playerDestroyer = new Ship(2);
const gameboardPlayer = new Gameboard();
gameboardPlayer.placeShip(playerDestroyer, { x: 3, y: 4 });
