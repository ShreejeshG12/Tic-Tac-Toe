const board = [["", "", ""], ["", "", ""], ["", "", ""],];



function createPlayer(name, symbol) {
    let score = 0;

    function increaseScore() {
        score++;
    }

    function getScore() {
        return `${name}'s current score is ${score}`;
    }

    return {
        name,
        symbol,
        increaseScore,
        getScore
    };
};

// Put this inside the game control function later. We are only creating and storing player names and symbols here.

const players = [
    createPlayer("player 1", "X"),
    createPlayer("player 2", "O")
];


// Helper function to check for winning row, column, diagonals

function checkLine(line) {
    if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
    }
    return null;
}



function winChecker(board) {

    //checking for rows

    for (let i = 0; i < board.length; i++) {
        const line = board[i];
        const winner = checkLine(line);

        if (winner !== null) {
            return winner;
        }
    }

    // Checking for columns

    for (let i = 0; i < board.length; i++) {
        const line = [board[0][i], board[1][i], board[2][i]];

        const winner = checkLine(line);
        if (winner !== null) {
            return winner;
        }
    }

    // Checking for diagonals

    const line1 = [board[0][0], board[1][1], board[2][2]];
    const line2 = [board[0][2], board[1][1], board[2][0]];

    const winner1 = checkLine(line1);
    const winner2 = checkLine(line2);

    if (winner1 !== null) {
        return winner1;
    }

    if (winner2 !== null) {
        return winner2;
    }


    // Checking if there are no winners and if any empty boxes exist in the game

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === "") {
                return null;
            }
        }
    }
    return "Draw";
};

// Maybe use this function to update UI, turns, reset game on UI

function winHandler() {
    const result = winChecker(board);
    return result;
};


// Increases a score for player based on the winner X or O. 
// This function loops through players array to assign score to the player who owns the winning symbol.
function resultChecker(result) {
    for (let player of players) {
        if (result === player.symbol) {
            player.increaseScore()
        }
    }
};


function gameController() {
    let currentPlayer = players[0];
    let gameActive = true;

    function makeMove(row, col) {
        if (!gameActive) return;


        if (board[row][col] !== "") return;

        board[row][col] = currentPlayer.symbol;

        const placedSymbol = currentPlayer.symbol;

        const result = winChecker(board);

        if (result !== null) {

            if (result !== "Draw") {
                resultChecker(result);
            }

            gameActive = false;

        }

        switchTurn();
        return {
            symbol: placedSymbol,
            result: result
        }
    }


    function switchTurn() {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
        } else {
            currentPlayer = players[0]
        }
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function resetGame() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                board[i][j] = "";
            }
        }
        currentPlayer = players[0];
        gameActive = true;

    }

    return {
        makeMove,
        getCurrentPlayer,
        resetGame
    };
};

// DOM manipulation

const game = document.querySelector(".game");

const title = document.createElement("h2");
title.textContent = "Tic Tac Toe Game"

const start = document.createElement("button");
start.classList.add("start");
start.textContent = "Start the Game!"

game.appendChild(title);
game.appendChild(start);


start.addEventListener("click", () => {
    const boxes = document.createElement("div");
    boxes.classList.add("boxes");
    game.appendChild(boxes);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {

            const box = document.createElement("button");
            box.classList.add("box");
            box.dataset.row = i;
            box.dataset.column = j;
            box.textContent = board[i][j];
            boxes.appendChild(box);
        }
    }
    const gameCall = gameController();
    const playBtns = document.querySelectorAll(".box");

    playBtns.forEach((button) => {
        button.addEventListener("click", () => {
            const row = Number(button.dataset.row);
            const column = Number(button.dataset.column);
            const move = gameCall.makeMove(row, column);
            button.textContent = move.symbol;
            const resultDisplay = document.createElement("div")

            if (move.result !== null) {
                resultDisplay.textContent = `${move.result} has Won!`
            } else if (move.result === "Draw") {
                resultDisplay.textContent = "It's a Draw!"
            }
            boxes.appendChild(resultDisplay);
        })
    })
});







