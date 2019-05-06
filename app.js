/**
 ********* BOARD CLASS *********
 *  __Constructor__
 * -xMoves and oMoves store the players moves in an array.
 * -currentPlayer
 * -winner defaults to null. If winner, it is a string containing either 'x' or 'o'.
 * -lastMove will be an integer that is updated by handleBoardInput.
 * 
 * __Handle Board Input__
 * Listens for clicks on the board and updates the model with that click.
 *  -updates lastMove and either xMoves or oMoves.
 * 
 * __Check Win__
 * Helper function checks to see if the player got three in a row.
 * Takes moves array.
 * Updates winner if true.
 * 
 * __UpdateView__
 * Updates the DOM with last move. If there is a winner, does something special :D
 * 
 * */

const gameBoard = document.getElementsByClassName('game-board')[0];

class Board {
  constructor(startingPlayer){
    this.xMoves = [];
    this.oMoves = [];
    this.currentPlayer = startingPlayer || 'x';
    this.winner = null;
    this.lastMove = null;
  }
  
  handleBoardInput = (position) => {
    if (this.currentPlayer === 'x') {
      this.xMoves.push(position);
      this.currentPlayer = 'o';
    } else if (this.currentPlayer === 'o') {
      this.oMoves.push(position);
      this.currentPlayer = 'x';
    }

    return;
  }

  checkWin = () => {
    return;
  }

  updateView = () => {
    return;
  }

}

let ticTacToe = new Board();

 
/* __EVENT LISTENERS__ */

gameBoard.addEventListener('click', (e)=>{
  const square =  e.composedPath()[0].id;
  ticTacToe.handleBoardInput(square);
})