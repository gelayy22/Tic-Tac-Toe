let playText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const playerO = "O"
const playerX = "X"
let gameStatus = true
let currentPlayer = playerX
let spaces = Array(9).fill(null)

const startGame = () => {
    console.log("Start");
    currentPlayer = Math.random() < 0.5 ? playerX : playerO;
    document.getElementById('playerIndicator').style.display = 'block'; 
    document.getElementById('playerLegend').style.display = 'block'; 
    document.getElementById('currentPlayerIndicator').innerText = 1;
    document.getElementById('player1').innerText = currentPlayer;
    document.getElementById('player2').innerText = currentPlayer == playerX ? playerO : playerX;
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}


function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id] && gameStatus){

        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){

            playerText.innerHTML = `Congrats! Player ${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            document.getElementById('restartBtn').style.display = 'block'; 
            document.getElementById('playerIndicator').style.display = 'none'; 
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            gameStatus = false;
            return
        }

        if (spaces.every(space => space !== null)) {
            playerText.innerHTML = "It's a draw!"
            document.getElementById('restartBtn').style.display = 'block'; 
            document.getElementById('playerIndicator').style.display = 'none'; 
            gameStatus = false
            return
        }
        currentPlayer = currentPlayer == playerX ? playerO : playerX
        document.getElementById('currentPlayerIndicator').innerText =  document.getElementById('player1').innerText == currentPlayer ? 1 : 2
    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}


restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    currentPlayer = Math.random() < 0.5 ? playerX : playerO;
    playerText.innerHTML = 'Tic Tac Toe'
    document.getElementById('restartBtn').style.display = 'none'; 
    document.getElementById('playerIndicator').style.display = 'block'; 
    document.getElementById('currentPlayerIndicator').innerText = 1;
    document.getElementById('player1').innerText = currentPlayer;
    document.getElementById('player2').innerText = currentPlayer == playerX ? playerO : playerX;
    gameStatus = true
}



document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startBtn');
    const gameboard = document.getElementById('gameboard');

    startButton.addEventListener('click', function () {
        startGame();
        startButton.style.display = 'none'; // Hide the start button
        gameboard.style.display = 'flex'; // Show the game board
    });
});
