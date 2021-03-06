/**
 * __If you are reading this code, I am very very sorry__
 * 
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
 * __Update View__
 * Updates the DOM with last move. If there is a winner, does something special :D
 * 
 * __Paint Squares__
 * Maps the player's moves to the appropriate squares
 * 
 * __Clear Board__
 * Paints all of the squares to white. Called by game-over, after the player's moves arrays are cleared (that's a lot of plurals and possessive nouns)
 * 
 * __Check Win__
 * Helper function checks to see if the player got three in a row.
 * Updates winner if true.
 * 
 * __Check for Conflicts__
 * Helper function that checks to see if the last move has already been played.
 * 
 * __Game Over__
 * Called by the update view function if there is a winner.
 * Shows the game over modal, changes background color and attaches the controller to the 'play again?' button
 * 
 * __Rotated and Gravitated__
 * -Rotated rotates all of the blocks 90 degrees. This works.
 * -Gravitated is supposed to drop the blocks to the lowest possible space. This does not work, yet...
 * 
 * */

const $ = (id) => document.getElementById(id);
const $c = (classname) => document.getElementsByClassName(classname);
const gameBoard = $c('game-board')[0];

class Board {
    /******
    * MODEL *
    ********/
  constructor(startingPlayer) {
    this.xMoves = [];
    this.oMoves = [];
    this.xScore = 0;
    this.oScore = 0;
    this.currentPlayer = startingPlayer || 'x';
    this.winner = null;
    this.xName = 'X';
    this.oName = 'O';
    this.gravity = false;
  }
  

    /****************
   * CONTROLLER *
   ****************/
  handleBoardInput = (move) => {
    if (this.checkForConflicts(move)) {
      return;
    } 
    if (this.currentPlayer === 'x') {
      this.xMoves.push(move);
    } else {
      this.oMoves.push(move);
    }

    //check for winner and change players
    this.winner = this.checkWin() ? this.currentPlayer : null;
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';

    //self-explanatory
    this.updateView();

    //if there is gravity, updates model and rerenders after .5 seconds
    if (this.gravity) {
      setTimeout(()=> this.applyGravity(), 500)
    }
    
  }



  /****************
   * VIEW HANDLING *
   ****************/
  updateView = () => {
    //clear squares then paint them
    [].forEach.call($c('square'), el => el.style.background = '#eee');
    this.paintSquares();

    if (this.winner !== null) {
      const winner = this.winner === 'x' ? this.xName : this.oName;
      this.gameOver(`${winner} WINS!`);
    } else if (this.xMoves.length + this.oMoves.length === 9) {
      this.gameOver('TIE GAME!');
    }
    //update current player in scoreboard and hidden gameover screen
    $('current-player').classList.remove('blue');
    $('current-player').classList.remove('red');
    $('current-player').innerHTML = this.currentPlayer === 'x' ? this.xName : this.oName;
    $('current-player').classList.add(this.currentPlayer === 'x' ? 'red' : 'blue');
  }

  paintSquares = () => {
    this.xMoves.forEach( square => {
      $(square).style.background = 'red';
    });
    this.oMoves.forEach( square => {
      $(square).style.background = 'blue';
    });
  }

  clearBoard = () => {
    //update scores
    if (this.winner === 'x') this.xScore++;
    if (this.winner === 'o') this.oScore++;
    $('x-score').innerHTML = this.xScore.toString();
    $('o-score').innerHTML = this.oScore.toString();

    //Winner starts next round
    this.currentPlayer = this.winner;
    this.winner = null;
    
    //clear board
    this.xMoves = [];
    this.oMoves = [];
    document.body.classList.remove('winner');
    $('gameover').style.display = 'none';

    //paint the board
    this.updateView()
  }



  /*******************
   * HELPER FUNCTIONS *
   *******************/
  checkForConflicts = (move) => {
    const allMoves = [...this.xMoves, ...this.oMoves];
    return allMoves.filter(x => x === move).length !== 0;
  }

  checkWin = () => {
    const winConditions = [['1','2','3'], ['4','5','6'], ['7','8','9'], ['1','4','7'], ['2','5','8'], ['3','6','9'], ['1','5','9'], ['3','5','7']];
    const playerMoves = this.currentPlayer === 'x' ? this.xMoves : this.oMoves;
    return winConditions.some(condition => condition.every(position => playerMoves.includes(position)))
  }
  
  gameOver = (text) => {
    //add flashy background, display gameover screen, and wire up playagain button.
    document.body.classList.add('winner');
    $('gameover').style.display = 'flex';
    $('gameover-text').innerHTML = text;
    $('play-again').addEventListener('click', ()=>{
      this.clearBoard();
    });
  }



    /****************
   * GRAVITY FEATURE *
   ****************/

  //updates model then calls update view
  applyGravity = () => {
    //Spin Em'
    let xRotated = this.xMoves.map(val => val = this.rotated(val))
      .sort((a, b) => b - a);
    let oRotated = this.oMoves.map(val => val = this.rotated(val))
      .sort((a, b) => b - a);
    //and drop em'
    xRotated = xRotated.map(val => this.gravitated(val, [...xRotated, ...oRotated]));
    oRotated = oRotated.map(val => this.gravitated(val, [...xRotated, ...oRotated]));

    this.xMoves = xRotated;
    this.oMoves = oRotated;
    console.log(this.xMoves, this.oMovees) 
    this.updateView();
  }

  //helper functions
  gravitated = (x, arr) => {
    let next = Number(x) + 3;
    next = next.toString();
    if (!arr.includes(next) && next < '9') {
      return this.gravitated(next, arr)
    } else {
      return next;
    }
  }

  rotated = (x) => { //had to brute force this one :(
    switch (x) {
      case '1':
        return '3';
      case '2':
        return '6';
      case '3':
        return '9';
      case '4':
        return '2';
      case '5':
        return '5';
      case '6':
        return '8';
      case '7':
        return '1';
      case '8':
        return '4';
      case '9':
        return '7';
    }
  }
}

//create a board
let ticTacToe = new Board();
ticTacToe.updateView();
 

  /******************
   * EVENT LISTENERS *
   ******************/

//Listen for user moves
gameBoard.addEventListener('click', e => {
  const square =  e.composedPath()[0].id;
  ticTacToe.handleBoardInput(square);
});

//get player names and update model
$('start').addEventListener('click', e => {
  //update model
  const player1 = document.getElementsByName('player')[0].value;
  const player2 = document.getElementsByName('player')[1].value;
  ticTacToe.xName = player1;
  ticTacToe.oName = player2;

  //update view
  ticTacToe.updateView();
  $c('red')[1].innerHTML = player1; //current-player is the first instance of the red class
  $c('blue')[0].innerHTML = player2; //first instance of the blue class
  $('start-game').style.display = 'none';
});

//set gravity state
$('gravity-toggle').addEventListener('click', e => {
  const state = e.path[0].checked;
  ticTacToe.gravity = state;
})