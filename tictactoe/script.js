let turnX = true;
let x = [];
let o = [];
let xWins = 0;
let oWins = 0;
// let endOfGame = false;
// let winningNumbers = ["123", "456", "789", "159", "357", "147", "258", "369"];
const body = document.getElementById("body");
const tictactoe = document.getElementById("tictactoe");
const winner = document.getElementById("winner");
const tali = document.getElementById("tali");
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
  turnX = true;
}
function undoPosition(player, position) {
  if (player === x) {
    x = player.filter((spot) => spot !== position.dataset.id);
    console.log(x);
    undo(position);
  }
  if (player === o) {
    o = player.filter((spot) => spot !== position.dataset.id);
    console.log(o);
    undo(position);
  }
}
function undo(position) {
  position.innerHTML = "";
  turnX = !turnX;
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
    winner.innerHTML = `<h1 class="mb-3">X is The Winner!!!</h1> 
    `;
    xWins++;
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
    winner.innerHTML = `<h1 class="mb-3">O is The Winner!!!</h1> 
    `;
    oWins++;
    return true;
  }
}
// function setTali() {
//   tali.innerHTML = `<h1>X Won ${xWins} Time(s) </h1>
//   <h1>O Won ${oWins} Time(s)</h1>`;
// }
function renderPage() {
  tali.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5  id="exampleModalLabel">Scores</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <h3>X Won ${xWins} Time(s) </h3>
      <h3>O Won ${oWins} Time(s)</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      
      </div>
    </div>
  </div>
</div>`;
}
function showScores() {}
function write(e) {
  let square = findClick(e);
  if (turnX) {
    square.innerHTML = `<img src="./images/x-png-35393.png" alt="">`;
    assignPosition(x, square);
    console.log(x);
  } else {
    square.innerHTML = `<img src="./images/letter-o-icon-png-20910.png" alt="">`;
    assignPosition(o, square);
    console.log(o);
  }
  turnX = !turnX;
}
tictactoe.addEventListener("click", function (e) {
  if (checkWinner()) {
    return;
  }
  if (e.target.closest("img")) {
    if (turnX) {
      undoPosition(o, e.target.closest("div.box"));
    } else {
      undoPosition(x, e.target.closest("div.box"));
    }
    return;
  } else {
    write(e);
    checkWinner();
    renderPage();
  }
});
console.log(boxes);
body.addEventListener("click", function (e) {
  if (e.target.closest("#reset")) {
    reset();
  }
});
renderPage();
