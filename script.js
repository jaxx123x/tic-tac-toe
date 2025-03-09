//GENERAL FUNCTION FOR CREATING A NEW GAME
function createGame(player1, player2) {
    return {
        board: ["", "", "", "", "", "", "", "", ""],
        player1: [player1, "X"],
        player2: [player2, "O"],
        score: [0, 0],
        moves: 0,
        gameOver: 0,
        roundPlayed: 0,
        winner: undefined
    }   
}

function createAI(player) {
    return createGame(player, computer)
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
            const winner = game.board[comb[0]]; //necesarry for score update.. 
            game.board = ["", "", "", "", "", "", "", "", ""];   
            game.moves = 0;
            if (winner == "X") {
                game.score[0]++;
                game.winner = game.player1[0];
            }
            else if (winner == "O") {
                game.score[1]++;
                game.winner = game.player2[0];
            }
           game.gameOver = 1;
           game.roundPlayed++;
        }
        else if (game.winner === undefined && !game.board.includes("")) {
            game.gameOver = 1;
            game.moves = 0;
            game.board = ["", "", "", "", "", "", "", "", ""];   
            game.roundPlayed++;
        }


    });
}



//HOPEFULLY THIS IIFE WILL HANDLE WHOLE DOM
const playerModeEvents = (function () {
    const btn = document.querySelector("#button");
    const squares = document.querySelectorAll(".table-square");
    const score = document.querySelector(".score");
    const nextRound = document.querySelector(".next-round");
    let currentGame;
        
        //THIS WILL CALL --CREATE GAME FUNCTION-- ON THE BASIS OF USER INPUT (<FORM> INPUT).
        btn.addEventListener("click", (event) => {      
            event.preventDefault();
            let p1Name = document.getElementById("player1").value;
            let p2Name = document.getElementById("player2").value;
            var game = createGame(p1Name, p2Name);
            if (p1Name !== "" && p2Name !== ""){
            currentGame = game;
            btn.style.backgroundColor = "rgb(119, 16, 16)";
            score.textContent = `${(currentGame.player1[0]).toUpperCase()} vs ${(currentGame.player1[1]).toUpperCase()}`
            console.log(game);
            }
            else {alert('plese fill player names')};
        })
        
        //THIS WILL HANDLE DOOM UPDATE & WILL UPDATE THE GAME ON THE BASIS OF USER INPUT (i.e each square).
        squares.forEach(square => {
            square.addEventListener("click", (event) => {
                if(currentGame.gameOver === 0) {
                let id = event.target.id;
                if (square.textContent === "") {
                gameFlow(currentGame.moves, currentGame.board, id);
                if (currentGame.moves % 2 === 0) {square.textContent = "X"};
                if (currentGame.moves % 2 !== 0) {square.textContent = "O"};
                currentGame.moves++;
                checkWinner(currentGame);
                }
                console.log(currentGame);
                if (currentGame.gameOver === 1 && currentGame.winner !== undefined) {
                    score.textContent = `${(currentGame.winner).toUpperCase()} won this round. Score is: ${(currentGame.player1[0]).toUpperCase()} ${currentGame.score[0]} - ${currentGame.score[1]} ${(currentGame.player2[0]).toUpperCase()}`;
                }
                else if (currentGame.gameOver === 1 && currentGame.winner  === undefined){
                    score.textContent = `Nobody won this round. Score is: ${(currentGame.player1[0]).toUpperCase()} ${currentGame.score[0]} - ${currentGame.score[1]} ${(currentGame.player2[0]).toUpperCase()}`;
                }
                }
            })
        });
        
        //EVENT FOR RESETING GAME DATAS AND DOM AFTER WIN
        nextRound.addEventListener("click", () => {
            currentGame.board = ["", "", "", "", "", "", "", "", ""];
            currentGame.gameOver = 0;
            currentGame.winner = undefined;
            squares.forEach(square => {
                square.textContent = "";
            });

        })
})();


/*const againstCompEvents = (function () {
    const compBtn = document.querySelector(".against-computer");
    const squares = document.querySelectorAll(".table-square");
    const score = document.querySelector(".score");
    const nextRound = document.querySelector(".next-round");
    let currentGame;

    compBtn.addEventListener("click", (event) => {
        event.preventDefault();
        var game = createAI(you);
    })
})();*/
