function createGame(player1, player2) {
    
    return {
        board: ["", "", "", "", "", "", "", "", ""],
        player1: [player1, "X"],
        player2: [player2, "O"],
        score: [0, 0],
        moves: 0
    }   
}

function gameFlow(moves, board, position) {    //game.moves / game.board / 0 1 2 3 etc
    if (board[position] === "") {
    if (moves % 2 == 0) {
        board[position] = "X";
        
    }
    else if (moves % 2 !== 0) {
        board[position] = "O"
        
    }
    }
    else return;
}

function checkWinner(game) {
    
    const winCombs = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winCombs.forEach(comb => {
        if (game.board[comb[0]] === game.board[comb[1]] && game.board[comb[0]] === game.board[comb[2]] && game.board[comb[0]] !== "") {
            game.board = ["", "", "", "", "", "", "", "", ""];
            game.moves = 0;
            
            alert('stop');
        }
    });
}

const events = (function () {
    const btn = document.querySelector("#button");
    const squares = document.querySelectorAll(".table-square");
    let currentGame;

        btn.addEventListener("click", (event) => {
            event.preventDefault();
            let p1Name = document.getElementById("player1").value;
            let p2Name = document.getElementById("player2").value;
            var game = createGame(p1Name, p2Name);
            currentGame = game;
            console.log(game);
        })

        squares.forEach(square => {
            square.addEventListener("click", (event) => {
                let id = event.target.id;
                if (square.textContent === "") {
                gameFlow(currentGame.moves, currentGame.board, id);
                if (currentGame.moves % 2 === 0) {square.textContent = "X"};
                if (currentGame.moves % 2 !== 0) {square.textContent = "O"};
                checkWinner(currentGame);
                currentGame.moves++;
                }
                console.log(currentGame);
            })
        });     
        
        
})();