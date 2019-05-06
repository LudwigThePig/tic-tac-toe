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
 * 
 * __UpdateView__
 * Updates the DOM with last move. If there is a winner, does something special :D
 * 
 * __Check Win__
 * Helper function checks to see if the player got three in a row.
 * Updates winner if true.
 * 
 * __Check for Conflicts__
 * Helper function that checks to see if the last move has already been played.
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
  
  handleBoardInput = (move) => {
    if (this.checkForConflicts(move)) {
      console.log('Hey, that move has already been played!');
    } else {
      if (this.currentPlayer === 'x') {
        this.xMoves.push(move);
      } else {
        this.oMoves.push(move);
      }
      console.log(this.checkWin());
      this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
      this.updateView();
    }
  }
    
    updateView = () => {
      this.xMoves.forEach( square => {
        document.getElementById(square).style.background = 'red';
      });
      this.oMoves.forEach( square => {
        document.getElementById(square).style.background = 'blue';
      });
    }

  //helper functions
  checkForConflicts = (move) => {
    const allMoves = [...this.xMoves, ...this.oMoves];
    return allMoves.filter(x => x === move).length !== 0;
  }

  checkWin = () => {
    const winConditions = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'], ['1','5','9'], ['3','5','7']];
    const playerMoves = this.currentPlayer === 'x' ? this.xMoves : this.oMoves;
    return winConditions.some(condition => condition.every(position => playerMoves.includes(position)))
  }
}

let ticTacToe = new Board();

 
/* __EVENT LISTENERS__ */

gameBoard.addEventListener('click', (e)=>{
  const square =  e.composedPath()[0].id;
  ticTacToe.handleBoardInput(square);
})