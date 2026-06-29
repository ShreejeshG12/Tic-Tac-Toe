/*const board = [["", "", ""], ["", "", ""], ["", "", ""],];*/

const board = [["X", "X", "X"], ["X", "O", "O"], ["O", "X", "O"]]


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

const result = winHandler();
resultChecker(result);

players[0].getScore();
players[1].getScore();



