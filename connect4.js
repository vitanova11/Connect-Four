/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) { // This starts a for loop. It sets y = 0, y must be less than 6 (HEIGHT), and y++ increases the value each time the code block is executed. 
    board.push(Array.from({ length: WIDTH })); // This takes the empty array of board and uses the .push method to push a new array with the length of 7 into it which creates a matrix array. 
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: Listen for clicks on row of column tops
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {  // This starts a for loop. It sets x = 0, x must be less than 7 (WIDTH), and x++ increases the value each time the code block is executed. 
    const headCell = document.createElement("td"); // This is creating the variable of headCell which will create a td element. A td defines a standard data cell in and HTML document. 
    headCell.setAttribute("id", x); // This code give the td that was created by headCell the id of x.
    top.append(headCell); // This adds the "top" variable to the headCell variable
  }
  htmlBoard.append(top); // This adds the 'htmlBoard' variable to the 'top' variable. 

  // TODO: Create table elements for all cells on the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) { // loop through the y coordinates from the base of the board to the top
    if (!board[y][x]) { // returns if y is undefined 
      return y;
    }
  }
  return null; // returns if y is filled
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece'); // add the div created in 'piece' to the classList
  piece.classList.add(`player${currPlayer}`); // add a class that shows if player1 or player2 placed the piece
    
  const placement = document.getElementById(`${y}-${x}`); // the placement of a piece in a cell by its x and y coordinates
  placement.append(piece); // appending that piece onto that specific placement within the table  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1; 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every( // This checks if every cell meets the following criteria:
      ([y, x]) => // these are the arguements and the => initiates a function
        y >= 0 && // checks if y is greater than or equal to 0 AND
        y < HEIGHT && // y is less than 6 (HEIGHT) AND
        x >= 0 && // x is greater than or equal to 0 AND
        x < WIDTH && // x is less than 7 (WIDTH) AND
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // All four-in-a-row cell combinations to win are checked
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // If any one of the four possible winning combinations (horizontal, vertical, diagonal right, or diagonal left) is true, then the player wins.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

const button = document.getElementById('button');
  
function resetGame() {
  board = [];
  makeBoard()
  htmlBoard()
}

button.addEventListener('click', function(resetGame){
  document.querySelectorAll('.piece').forEach(e => e.remove());
  board = [];
  makeBoard()
  htmlBoard()
})

makeBoard();
makeHtmlBoard();
