//GENERAL FUNCTION FOR CREATING A NEW GAME
function createGame(player1, player2) {
    
    return {
        board: ["", "", "", "", "", "", "", "", ""],
        player1: [player1, "X"],
        player2: [player2, "O"],
        score: [0, 0],
        moves: 0
    }   
}

//BOARD UPDATE FUNCTION
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

//WINNER CHECKING 
function checkWinner(game) {
    
    const winCombs = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

  

    //if one combination matches, reset game board and game moves & update score.
    winCombs.forEach(comb => {
        if (game.board[comb[0]] === game.board[comb[1]] && game.board[comb[0]] === game.board[comb[2]] && game.board[comb[0]] !== "") {
            game.board = ["", "", "", "", "", "", "", "", ""];   
            game.moves = 0;
            
           
        }
    });

    
}


//HOPEFULLY THIS IIFE WILL HANDLE WHOLE DOM
const events = (function () {
    const btn = document.querySelector("#button");
    const squares = document.querySelectorAll(".table-square");
    let currentGame;
        
        //THIS WILL CALL --CREATE GAME FUNCTION-- ON THE BASIS OF USER INPUT (<FORM> INPUT).
        btn.addEventListener("click", (event) => {      
            event.preventDefault();
            let p1Name = document.getElementById("player1").value;
            let p2Name = document.getElementById("player2").value;
            var game = createGame(p1Name, p2Name);
            currentGame = game;
            console.log(game);
        })
        
        //THIS WILL HANDLE DOOM UPDATE & WILL UPDATE THE GAME ON THE BASIS OF USER INPUT (i.e each square).
        squares.forEach(square => {
            square.addEventListener("click", (event) => {
                let id = event.target.id;
                if (square.textContent === "") {
                gameFlow(currentGame.moves, currentGame.board, id);
                if (currentGame.moves % 2 === 0) {square.textContent = "X"};
                if (currentGame.moves % 2 !== 0) {square.textContent = "O"};
                
                currentGame.moves++;
                checkWinner(currentGame);
                }
                console.log(currentGame);
            })
        });     
        
        
})();