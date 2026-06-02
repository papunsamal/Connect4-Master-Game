const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardElement =
document.getElementById("board");

const statusElement =
document.getElementById("status");

function createBoard(){

boardElement.innerHTML = "";
board = [];

for(let r=0;r<rows;r++){

board[r] = [];

for(let c=0;c<cols;c++){

board[r][c] = "";

const cell =
document.createElement("div");

cell.classList.add("cell");

cell.addEventListener(
"click",
()=>dropPiece(c)
);

boardElement.appendChild(cell);
}
}
}

function dropPiece(col){

if(gameOver) return;

let placed = false;

for(let row=rows-1;row>=0;row--){

if(board[row][col] === ""){

placed = true;

board[row][col] = currentPlayer;

const index =
row * cols + col;

boardElement.children[index]
.classList.add(currentPlayer);

if(checkWinner(row,col)){

statusElement.innerHTML =
(currentPlayer==="red"
? "🔴 RED"
: "🟡 YELLOW")
+
" WINS 🏆";

gameOver = true;

confetti();

return;
}

if(board.flat().every(
cell => cell !== ""
)){
statusElement.innerHTML =
"🤝 MATCH DRAW!";
gameOver = true;
return;
}

currentPlayer =
currentPlayer==="red"
? "yellow"
: "red";

statusElement.innerHTML =
(currentPlayer==="red"
? "🔴 Red Player Turn"
: "🟡 Yellow Player Turn");

break;
}
}

if(!placed){
statusElement.innerHTML =
"⚠️ Column Full!";
}
}

function checkWinner(row,col){

const player = board[row][col];

const directions = [
[0,1],
[1,0],
[1,1],
[1,-1]
];

for(let [dr,dc] of directions){

let count = 1;

for(let i=1;i<4;i++){

let r=row+dr*i;
let c=col+dc*i;

if(
r>=0 &&
r<rows &&
c>=0 &&
c<cols &&
board[r][c]===player
){
count++;
}else{
break;
}
}

for(let i=1;i<4;i++){

let r=row-dr*i;
let c=col-dc*i;

if(
r>=0 &&
r<rows &&
c>=0 &&
c<cols &&
board[r][c]===player
){
count++;
}else{
break;
}
}

if(count>=4){

document
.querySelectorAll("." + player)
.forEach(cell=>{
cell.classList.add("win");
});

return true;
}
}

return false;
}

function restartGame(){

currentPlayer = "red";
gameOver = false;

statusElement.innerHTML =
"🔴 Red Player Turn";

createBoard();
}

function confetti(){

for(let i=0;i<150;i++){

const piece =
document.createElement("div");

piece.style.position="fixed";
piece.style.width="10px";
piece.style.height="10px";

piece.style.background=
`hsl(${Math.random()*360},
100%,50%)`;

piece.style.left=
Math.random()*100+"vw";

piece.style.top="-20px";

piece.style.zIndex="999";

document.body.appendChild(piece);

piece.animate(
[
{transform:"translateY(0) rotate(0deg)"},
{transform:"translateY(100vh) rotate(720deg)"}
],
{
duration:
3000 + Math.random()*2000
}
);

setTimeout(()=>{
piece.remove();
},5000);
}
}

createBoard();