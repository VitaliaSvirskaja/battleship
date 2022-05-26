import "./style.css";
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Coordinate } from "./Coordinate";
import { AttackResponse } from "./AttackResponse";
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

function initializeGameboard(field: HTMLDivElement, gameboard: Gameboard) {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const divElement = document.createElement("div");
      field?.appendChild(divElement);
      divElement.classList.add("element");
      divElement.addEventListener("click", () => {
        const coordinate: Coordinate = { x: x, y: y };
        let isHit = gameboard.receiveAttack(coordinate);
        if (isHit === AttackResponse.Hit) {
          divElement.innerHTML = "X";
          divElement.style.color = "red";
          divElement.style.backgroundColor = "#ffbacd";
          console.log("x: ", x, "y: ", y);
          console.log("Ship hit");
        } else if (isHit === AttackResponse.Sunk) {
          divElement.innerHTML = "X";
          divElement.style.color = "red";
          divElement.style.backgroundColor = "#ffbacd";
          console.log("Ship sunk");
        } else {
          divElement.innerHTML = "O";
          divElement.style.color = "green";
          divElement.style.backgroundColor = "#e3f3e7";
          console.log("Ship missed");
        }
        if (gameboard.allShipsSunk()) {
          console.log("All ships sunk!");
        }
      });
    }
  }
}

const playerDestroyer = new Ship(2);
const gameboardPlayer = new Gameboard();
gameboardPlayer.placeShip(playerDestroyer, { x: 2, y: 3 });

const computerDestroyer = new Ship(2);
const computerSubmarine = new Ship(3);
const gameboardComputer = new Gameboard();
gameboardComputer.placeShip(computerDestroyer, { x: 1, y: 3 });
gameboardComputer.placeShip(computerSubmarine, { x: 2, y: 1 });

const playerGameboard = document.querySelector(
  "#playerGameboard"
) as HTMLDivElement;
initializeGameboard(playerGameboard, gameboardPlayer);

const computerGameboard = document.querySelector(
  "#computerGameboard"
) as HTMLDivElement;
initializeGameboard(computerGameboard, gameboardComputer);
