const board = [["", "", ""], ["", "", ""], ["", "", ""],];


function createPlayer(name) {
    let score = 0;

    function increaseScore() {
        score++;
    }

    function getScore() {
        return score;
    }

    return {
        name,
        increaseScore,
        getScore
    };
};

const A = createPlayer("A");
const B = createPlayer("B");

A.increaseScore();
console.log(A.getScore());
console.log(B.getScore());