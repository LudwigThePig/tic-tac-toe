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
        this.currentPlayer = 'o';
      } else if (this.currentPlayer === 'o') {
        this.oMoves.push(move);
        this.currentPlayer = 'x';
      }
      this.checkWin();
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
    const playerMoves = this.currentPlayer !== 'x' ? this.xMoves : this.oMoves; //remember, currentPlayer has already been switched
    playerMoves.forEach((move, idx) => {
      let horiz = playerMoves.filter(x => mov),
          vert = [move],
          diag = [move];
      for (let i = idx; i < playerMoves.length; i++) {
        const cur = playerMoves[i]
        console.log(playerMoves, cur)
        if (cur - 1 === horiz[horiz.length - 1]) {
          horiz.push(cur);
        }
        if (vert[vert.length - 1] === cur - 3) {
          vert.push(cur)
        }
        if (diag[diag.length - 1] === cur - 4) {
          diag.push(cur);
        }
      }
      // console.log(horiz, vert, diag)
    })
  }

}

let ticTacToe = new Board();

 
/* __EVENT LISTENERS__ */

gameBoard.addEventListener('click', (e)=>{
  const square =  e.composedPath()[0].id;
  ticTacToe.handleBoardInput(square);
})