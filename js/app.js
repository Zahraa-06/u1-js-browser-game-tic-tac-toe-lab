//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
    
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')
/*-------------------------------- Functions --------------------------------*/
function init () {
board = [ '', '', '',
          '', '', '',
          '', '', '' ]
turn = 'X' 
winner = false
tie = false
render ()
}

const updateBoard = () => {
    board.forEach((cell, index) => {
        const square = squareEls[index];
        square.textContent = cell;
        square.className = `sqr ${cell.toLowerCase()}`;
        square.style.color = cell === 'X' ? 'black' : 'blue';
        square.style.backgroundColor = cell === '' ? 'grey' : '';
    });
}

const updateMessage = () => {
    if (winner === true) {
        messageEl.textContent = `Congratulations ${turn}! You won!`
        messageEl.className = 'winner'
    } else if (tie === true) {
        messageEl.textContent = `It is a tie!`
        messageEl.className = 'tie'
    } else {
        messageEl.textContent = `It is ${turn}'s turn!`
        messageEl.className = ''
    }
}

const render = () => {
    updateBoard ()
    updateMessage ()
}

const placePiece = (index) => {
    board[index] = turn
}

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true
        return
    }
})
}

const checkForTie = () => {
    if (winner === true) {
        return
    }
    tie = board.every(square => square !== '')
}

const switchPlayerTurn = () => {
    if (winner || tie) {
        return
    }
    turn = turn === 'X' ? 'O' : 'X'
}

const handleClick = (event) => {
    const square = event.target.closest ('.sqr')
    if (!square) {
        return
    }
    const squareIndex = parseInt(square.id)
    if (board[squareIndex] !== '' || winner || tie) {
        return
    } 
    placePiece (squareIndex)
    checkForWinner ()
    checkForTie ()
    if (!winner && !tie) {
    switchPlayerTurn ()
    }
    render ()
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)
init ()


