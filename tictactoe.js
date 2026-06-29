const board = [["", "", ""], ["", "", ""], ["", "", ""],];


function createPlayer(name) {
    let score = 0;

    function increaseScore() {
        score++;
    }

    function getScore() {
        return `${name}'s currnet score is ${score}`;
    }

    return {
        name,
        increaseScore,
        getScore
    };
};


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

    // checking for columns

    for (let i = 0; i < board.length; i++) {
        const line = [board[0][i], board[1][i], board[2][i]];

        const winner = checkLine(line);
        if (winner !== null) {
            return winner;
        }
    }

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

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === "") {
                return null;
            }
        }
    }
    return "Draw";

}

