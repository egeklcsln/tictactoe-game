const cells= document.querySelectorAll(".cell");
const statusText= document.getElementById("statusText");
const RestartBtn= document.querySelector("#restartBtn");
const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["","","","","","","","",""];
let currentPlayer="X";
let running=false;
initalizeGame();

function initalizeGame(){
    cells.forEach(cell=> cell.addEventListener("click",cellClicked));
    RestartBtn.addEventListener("click",restartGame);
    statusText.innerHTML=currentPlayer+"' turn";
    running=true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex]!=""|| !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();

    
}
function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}
function changePlayer(){
    currentPlayer=(currentPlayer=="X")? "O" :"X";
    statusText.innerHTML=currentPlayer+"' turn";
}
function checkWinner(){
    let roundWon =false;
    for(let i=0;i<winConditions.length;i++){
        const condition =winConditions[i];
        const CellA = options[condition[0]];
        const CellB = options[condition[1]];
        const CellC = options[condition[2]];
        if(CellA==""||CellB==""||CellC==""){
            continue;
        }
        if(CellA==CellB && CellB ==CellC){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusText.innerHTML=currentPlayer+"'wins!";
        running=false;
    }
    else if(!options.includes("")){
        statusText.innerHTML="Draw!";
        running=false;
    }
    else{
        changePlayer();
    }
    
}
function restartGame(){
    currentPlayer="X";
    options=["","","","","","","","",""];
    statusText.innerHTML=currentPlayer+"' turn";
    cells.forEach(cell=>cell.innerHTML="");
    running=true;
}
