const showStatus = document.querySelector('.game-status');

let isActive = true;
let currentPlayer = "X";
let stateOfGame = ["", "", "", "", "", "", "", "", ""];

const winnerMsg = () => `Player ${currentPlayer} has won!`;
const tieMsg = () => `Game ended in a draw`;
const playerTurn = () => `It is ${currentPlayer}'s turn to play`;

showStatus.innerHTML = playerTurn();

const winconditions = [
    [0, 1 , 2],
    [3, 4 , 5],
    [6, 7 , 8],
    [0, 3 , 6],
    [1, 4 , 7],
    [2, 5 , 8],
    [0, 4 , 8],
    [2, 4 , 6],
];

function playedCell(touchedCell, touchCellIndex) {
    stateOfGame[touchCellIndex] = currentPlayer;
    touchedCell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    showStatus.innerHTML = playerTurn();
}

function validateResult() {
    let isRoundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCond = winconditions[i];
        let boardCell1 = stateOfGame[winCond[0]];
        let boardCell2 = stateOfGame[winCond[1]];
        let boardCell3 = stateOfGame[winCond[2]];

        if(boardCell1 === '' || boardCell2 === '' || boardCell3 === '') {
            continue;
        }

        if (boardCell1 === boardCell2 && boardCell2 === boardCell3) {
            isRoundWon = true;
            break;
        }
    }

    if(isRoundWon) {
        showStatus.innerHTML = winnerMsg();
        isActive = false;
        return;
    }

    let isRoundDrawn = !stateOfGame.includes("");
    if(isRoundDrawn) {
        showStatus.innerHTML = tieMsg();
        isActive = false;
        return;
    }

    playerChange();
}

function cellTouchend(touchedCellEvent) {
    const touchedCell = touchedCellEvent.target;
    const touchedCellIndex = parseInt(touchedCell.getAttribute('data-cell-number'));

    if(stateOfGame[touchedCellIndex] !== "" || !isActive) {
        return;
    }

    playedCell(touchedCell, touchedCellIndex);
    validateResult();
}

function restartGame() {
    isActive = true;
    currentPlayer = "X";
    stateOfGame = ["", "", "", "", "", "", "", "", ""];
    showStatus.innerHTML = playerTurn();
    document.querySelectorAll('.board').forEach(board => board.innerHTML = "");
}

document.querySelectorAll('.board').forEach(board => board.addEventListener('click', cellTouchend));
document.querySelector('.reset').addEventListener('click', restartGame);
