const players = [
  {
    name: "horse",
    image: "./images/monopoly-horse.png",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
  {
    name: "dog",
    image: "./images/monopoly-dog.png",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
  {
    name: "hat",
    image: "./images/monopoly-hat.png",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
  {
    name: "boot",
    image: "./images/monopoly-boot.jpg",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
  {
    name: "car",
    image: "./images/monopoly-car.png",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
  {
    name: "train",
    image: "./images/monopoly-train.png",
    position: null,
    money: null,
    properties: null,
    turn: null,
    active: false,
  },
];
const body = document.querySelector("body");
const goSquare = document.getElementById("corner-right-bottom");
const diceRollDisplay = document.getElementById("dice-roll-display");
const rollBtn = document.getElementById("roll-button");
const startBtn = document.getElementById("start-button");
const nextBtn = document.getElementById("next-button");
const displayBoard = document.querySelector(".display-of-ongoing-events");
const showPropertyBtn = document.getElementById("show-players-properties");
const playerProperties = document.getElementById("player-properties");
let activePlayers = [];
let i = 1;
let activePlayer = {};

function choosePlayer(character) {
  for (const player of players) {
    if (player.name === character) {
      player.turn = i;
      player.position = 1;
      player.money = 1500;
      i++;
      placePlayer(player);
    }
    if (player.turn === 1) {
      activateTurn(player);
    }
  }
}

function placePlayer(player) {
  goSquare.innerHTML += `<img class="active-players" src=${player.image}></img>`;
}

function showRoll(roll) {
  diceRollDisplay.innerHTML = `Dice Roll: ${roll}`;
}

function rollDice() {
  let roll = Math.ceil(Math.random() * 6) + Math.ceil(Math.random() * 6);
  showRoll(roll);
  changePositionOfPlayer(roll);
}

function removeCharacterFromPickList(character) {
  const piece = document.querySelector(`img[data-name="${character}"]`);
  piece.style.display = "none";
  console.log(piece);
}

function setArrayOfActivePlayers() {
  activePlayers = players
    .filter((player) => player.turn)
    .sort((a, b) => {
      if (a.turn < b.turn) {
        return -1;
      }
    });
  console.log(activePlayers);
}

function removePlayersFromMiddleOfBoard() {
  displayBoard.innerHTML = "";
}

function findActivePlayer() {
  for (const player of activePlayers) {
    if (player.active) {
      return player;
    }
  }
}
function activateTurn(player) {
  player.active = true;
}

function showActivePlayer(player) {
  displayBoard.innerHTML = `<h1>It's the ${player.name}'s Turn</h1>`;
}

function nextPlayerTurn() {
  const playersTurn = activePlayers.findIndex(
    (player) => player.active === true
  );
  if (playersTurn + 1 < activePlayers.length) {
    activePlayers[playersTurn].active = false;
    activePlayers[playersTurn + 1].active = true;
    console.log(activePlayers);
  } else {
    activePlayers[playersTurn].active = false;
    activePlayers[0].active = true;
    console.log(activePlayers);
  }
}

function changePositionOfPlayer(roll) {
  for (const player of activePlayers) {
    if (player.active) {
      // let position = player.position;
      let squarePosition = document.querySelector(
        `div[data-id="${player.position}"]`
      );
      let imageToRemove = document.querySelector(`img[src="${player.image}"]`);
      squarePosition.removeChild(imageToRemove);
      player.position += roll;
      if (player.position > 40) {
        player.position = player.position - 40;
        console.log(player.position);
      }
      movePlayer(player);
    }
  }
}

function movePlayer(player) {
  let position = player.position;
  let squarePosition = document.querySelector(
    `div[data-id="${player.position}"]`
  );
  squarePosition.innerHTML += `<img class="active-players" src="${player.image}" ></img>`;
}

function showPlayersProperties() {
  const player = findActivePlayer();
  // const playerName = document.createTextNode(`${player.name}`);
  // const playerMoney = document.createTextNode(`Money: $${player.money}`);
  // const playerProperties = document.createTextNode(
  //   `Properties: ${player.properties}`
  // );
  playerProperties.innerHTML = `<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="modal-title">${player.name}</h1>
      <img class="active-players" src= ${player.image}></img>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">Money: $${player.money} <br> Properties: ${player.properties}</div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
    </div>
  </div>
</div>`;
}

displayBoard.addEventListener("click", function (e) {
  try {
    choosePlayer(e.target.closest("img[data-name]").dataset.name);
    removeCharacterFromPickList(
      e.target.closest("img[data-name]").dataset.name
    );
  } catch (error) {}
});

rollBtn.addEventListener("click", rollDice);

startBtn.addEventListener("click", () => {
  setArrayOfActivePlayers();
  removePlayersFromMiddleOfBoard();
  showActivePlayer(findActivePlayer());
});
nextBtn.addEventListener("click", function () {
  nextPlayerTurn();
  showActivePlayer(findActivePlayer());
});
showPropertyBtn.addEventListener("click", showPlayersProperties);
