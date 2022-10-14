let turnX = true;
let x = [];
let o = [];
// let winningNumbers = ["123", "456", "789", "159", "357", "147", "258", "369"];
const body = document.getElementById("body");
const tictactoe = document.getElementById("tictactoe");
const winner = document.getElementById("winner");
const boxes = document.querySelectorAll(`.box`);
function findClick(e) {
  let target = e.target.closest("div[data-id]");
  return target;
}
function assignPosition(player, position) {
  player.push(position.dataset.id);
}
function reset() {
  for (const box of boxes) box.innerHTML = "";
  winner.innerHTML = "";
  x = [];
  o = [];
}
function preventSwitchingLetter() {}
function checkWinner() {
  if (
    (x.sort().join("").toString().includes("1") &&
      x.sort().join("").toString().includes("2") &&
      x.sort().join("").toString().includes("3")) ||
    (x.sort().join("").toString().includes("4") &&
      x.sort().join("").toString().includes("5") &&
      x.sort().join("").toString().includes("6")) ||
    (x.sort().join("").toString().includes("7") &&
      x.sort().join("").toString().includes("8") &&
      x.sort().join("").toString().includes("9")) ||
    (x.sort().join("").toString().includes("1") &&
      x.sort().join("").toString().includes("5") &&
      x.sort().join("").toString().includes("9")) ||
    (x.sort().join("").toString().includes("3") &&
      x.sort().join("").toString().includes("5") &&
      x.sort().join("").toString().includes("7")) ||
    (x.sort().join("").toString().includes("1") &&
      x.sort().join("").toString().includes("4") &&
      x.sort().join("").toString().includes("7")) ||
    (x.sort().join("").toString().includes("2") &&
      x.sort().join("").toString().includes("5") &&
      x.sort().join("").toString().includes("8")) ||
    (x.sort().join("").toString().includes("3") &&
      x.sort().join("").toString().includes("6") &&
      x.sort().join("").toString().includes("9"))
  ) {
    winner.innerHTML = `<h1>X is The Winner</h> 
    <button>Reset</button>`;
    return true;
  }
  if (
    (o.sort().join("").toString().includes("1") &&
      o.sort().join("").toString().includes("2") &&
      o.sort().join("").toString().includes("3")) ||
    (o.sort().join("").toString().includes("4") &&
      o.sort().join("").toString().includes("5") &&
      o.sort().join("").toString().includes("6")) ||
    (o.sort().join("").toString().includes("7") &&
      o.sort().join("").toString().includes("8") &&
      o.sort().join("").toString().includes("9")) ||
    (o.sort().join("").toString().includes("1") &&
      o.sort().join("").toString().includes("5") &&
      o.sort().join("").toString().includes("9")) ||
    (o.sort().join("").toString().includes("3") &&
      o.sort().join("").toString().includes("5") &&
      o.sort().join("").toString().includes("7")) ||
    (o.sort().join("").toString().includes("1") &&
      o.sort().join("").toString().includes("4") &&
      o.sort().join("").toString().includes("7")) ||
    (o.sort().join("").toString().includes("2") &&
      o.sort().join("").toString().includes("5") &&
      o.sort().join("").toString().includes("8")) ||
    (o.sort().join("").toString().includes("3") &&
      o.sort().join("").toString().includes("6") &&
      o.sort().join("").toString().includes("9"))
  ) {
    winner.innerHTML = `<h1>O is The Winner</h> 
    <button>Reset</button>
    `;
    return true;
  }
}
// function checkWinner(){
//     for (const i=1; i<10; 1++){

//         for(const j=2;j<10;j++){}
//     }
// }
function write(e) {
  let square = findClick(e);
  if (turnX) {
    square.innerHTML = `<img src="./images/x-png-35393.png" alt="">`;
    assignPosition(x, square);
  } else {
    square.innerHTML = `<img src="./images/letter-o-icon-png-20910.png" alt="">`;
    assignPosition(o, square);
  }
  turnX = !turnX;
}
tictactoe.addEventListener("click", function (e) {
  if (e.target.closest("img")) {
    return;
  } else {
    write(e);
    checkWinner();
  }
});
console.log(boxes);
body.addEventListener("click", function (e) {
  if (e.target.closest("button")) {
    reset();
  }
});
