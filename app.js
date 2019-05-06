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

class Board {
  constructor(startingPlayer){
    xMoves = [];
    oMoves = [];
    currentPlayer = startingPlayer || 'x';
    winner = null;
    lastMove = null;
  }
  
  handleBoardInput(player, position) {
    return;
  }

  checkWin(player) {
    return;
  }

  updateView(player) {
    return;
  }

}