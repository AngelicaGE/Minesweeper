// Template and demo code (c) copyright 2019 Angelica Guemes, all rights reserved
import Cell from './cell.js'

export default class Map {

  constructor(alerts) 
  {
    this.tableRow;                               // I initialize the rows with the small size. Because that is the default
    this.tableData;                             // I initialize the columns with the small size. Because that is the default
    this.state=["noClick", "firstClick", "nClick", "lose"];// state of the grid
    this.time;                                    //keeps track of timer
    this.amountMines;                        //mines on the grid
    this.alerts = alerts;                        //Need alerts here because here is when i know when user wins or loses and alerts is the one that gives the retroalimentation
    this.start();
  }

  start() {
    this.cellsArr = [];
    this.cellsArrBombs = [];
    this.renderMineField( 1);          //width, height, tr, td, amount of mines
    this.initGridHandlers();                              //handle left and right click
    this.flags = 0;                                     // The amount of flags the user has put in the grid
    this.flagsInMines=0;                               // The counter of mines that have a flag on them.
    this.startGame = this.state[0];               // start when user clicks a cell for the first game
    this.cellsRevealed = 0;                       //counter of cells that have been left clicked and have no mine on it

  }

  initGridHandlers() 
  { // Added this because it is call from menu.js and I need to specify the query selector
    if(this.startGame != "lose"){                                                             
    //left click
    document.querySelector('table').addEventListener('click', (event) => {
      this.handleGridLeftClick(event);
    });
    //right click
    document.querySelector('table').addEventListener('contextmenu', (event) => {
      event.preventDefault(); //prevents the menu of right click to come up
      this.handleGridRightClick(event);
    });
  }
  }

  restartGame()       //called everytime  a grid is generated. because that means it is a new game and everything needs to be reset
  {              
    this.startGame = "noClick";
    this.cellsArr = [];
    this.cellsArrBombs = [];
    this.cellsRevealed = 0;
    this.flags = 0;                                     // The amount of flags the user has put in the grid
    this.flagsInMines=0;                               // The counter of mines that have a flag on them.
    document.querySelector("#grid").classList.remove("noEvent"); //grid becomes clickable again  
  }

  //width, height, tr, td, amount of mines
  renderMineField(level)
   {
    this.restartGame();           //restart all attributes
    /*boardclass has the exact px width and hight i ewant for each level so i need to know which level was clicked to resize the game. */
    let boardClass = "boardEasy";
    let w;
    let h;
    let tr;
    let td;
    let m; 
    if (level == 1) {
      level = "easy";
      boardClass = "boardEasy";
      w = 400;
      h = 400;
      tr = 8;
      td = 8;
      m = 10; 
    } else if (level == 2) {
      level = "medium";
      boardClass = "boardMedium";
      w = 466;
      h = 526;
      tr = 16;
      td = 16;
      m = 30; 
    } else {
      level = "hard";
      boardClass = "boardHard";
      w = 700;
      h = 466;
      tr = 16;
      td = 30;
      m = 40; 
    }
    document.querySelector("#board").classList = boardClass;
    var markup = `<table>`;
    for (let i = 0; i < tr; i++) {                                                       //table rows
      markup += `<tr class="">`;
      for (let j = 0; j < td; j++) {                                                      //table data
        markup += `<td data-col="${j}" data-row="${i}" class="cell notRev ${level}"></td>`
        let cellAux = new Cell(i, j);                                                     //send row, col //I create a new cell and add it to my array of cells
        this.cellsArr.push(cellAux);                                                      //add the cell to my array of cells.
      }
      markup += `</tr>`;
    }
    markup += `</table>`;
    //Select the space for the grid
    let gameEl = document.querySelector(`#grid`);
    //Set table inside the div grid
    gameEl.innerHTML = markup;
    this.placeMines(tr, td, m);                                                           //place the mines. Actually just marking the cell objects as hasmine=true
    this.updateAdjacentCounts(tr, td);                                                    //gives each cell object the amount of adjacent bombs
  }

  placeMines(tr, td, m) {
    this.tableRow = tr;
    this.tableData = td;
    for (var i = 0; i < m; i++) {                                   //will do it one time per mine. because i want that amount
      let row = Math.floor(Math.random() * tr);                     //get random row and column (take into account max row and max col)
      let col = Math.floor(Math.random() * td);
      while (this.cellAt(row, col).hasMine == true) {               //while i keep getting a mine that already is a mine i will generate another random mine
        row = Math.floor(Math.random() * tr);
        col = Math.floor(Math.random() * td);
      }
      this.cellAt(row, col).hasMine = true;   
      this.cellsArrBombs.push(this.cellAt(row, col));
      console.log(`bomb ${i+1} at ${row}, ${col}`);
    }
  }

  updateAdjacentCounts(tr, td) {
    for (var i = 0; i < tr; i++) {
      for (var j = 0; j < td; j++) {
        //I need to check the 8 posible updateAdjacent
        //I only check adjacents if it is not a bomb
        var myElement = this.cellAt(i, j);
        var count = 0;
        if (myElement.hasMine == false) {
          //top middle
          if (i - 1 >= 0) { //y-1
            if (this.cellAt(i - 1, j).hasMine == true) {
              count++;
            }
          }
          //bottom middle 
          if (i + 1 < tr) { //y-1
            if (this.cellAt(i + 1, j).hasMine == true) {
              count++;
            }
          }
          //top left
          if (i - 1 >= 0 && j - 1 >= 0) { //y-1
            if (this.cellAt(i - 1, j - 1).hasMine == true) {
              count++;
            }
          }
          //top right
          if (i - 1 >= 0 && j + 1 < td) { //y-1
            if (this.cellAt(i - 1, j + 1).hasMine == true) {
              count++;
            }
          }
          //bottom left 
          if (i + 1 < tr && j - 1 >= 0) { //y-1
            if (this.cellAt(i + 1, j - 1).hasMine == true) {
              count++;
            }
          }
          //bottom right
          if (i + 1 < tr && j + 1 < td) { //y-1
            if (this.cellAt(i + 1, j + 1).hasMine == true) {
              count++;
            }
          }
          // right
          if (j + 1 < td) { //y-1
            if (this.cellAt(i, j + 1).hasMine == true) {
              count++;
            }
          }
          //left
          if (j - 1 >= 0) { //y-1
            if (this.cellAt(i, j - 1).hasMine == true) {
              count++;
            }
          }
        }
        myElement.addjacentMine = count;
      }
    }
  }

  revealeAdjacents(i, j)
   { // i = tr j = td //check all the cells surrounding one cell(i,j)
    this.bottom(i,j);
    this.top(i,j);
    this.left(i,j);
    this.right(i,j);
    this.topLeft(i,j);
    this.topRight(i,j);
    this.bottomLeft(i,j);
    this.bottomtopRight(i,j);
  }

  top(i, j){
    if (--i >=0) {
      this.revealCell(i, j);
    }
  }

  bottom(i,j)
  {
    if (++i < this.tableRow) {
      this.revealCell(i, j);
    }
  }

  left(i, j)
  {
    if (--j >=0 ) {
      this.revealCell(i, j);
    }
  }

  right(i,j)
  {
    if (++j < this.tableData) {
      this.revealCell(i, j);
    }
  }

  topLeft(i,j)
  {
    if (--i >=0 && --j >= 0) {
      this.revealCell(i, j);
    }
  }

  topRight(i,j)
  {
    if (--i >=0 && ++j < this.tableData) {
      this.revealCell(i, j);
    }
  }

  bottomLeft(i,j)
  {
    if (++i < this.tableRow && --j >= 0) {
      this.revealCell(i, j);
    }
  }

  bottomtopRight(i,j)
  {
    if (++i < this.tableRow && ++j < this.tableData) {
      this.revealCell(i, j);
    }
  }

  revealCell(i, j)
  {
    //get bottom middle cell
    let myEventTop = this.cellAt(i, j);
    //if it has a number different than cero and it is not a mine then reveal
    let myEvent = this.cellAt(i, j);
    let myEventActualHTML = document.querySelector(`[data-col="${j}"][data-row="${i}"]`);
    let addjacentMines = myEvent.addjacentMine;
    if (myEventTop.hasMine == false && myEventTop.revealed == false && myEventTop.marked == false) {
      this.checkWin();                                                    //One cell is revealed. Add it to the cells revealed
      if (myEventTop.addjacentMine > 0) {
        myEventActualHTML.classList.remove("notRev");
        myEventActualHTML.classList.add("Rev" + addjacentMines);
        myEvent.revealed = true;
      } else if (myEventTop.addjacentMine == 0) {
        myEventActualHTML.classList.remove("notRev");
        myEventActualHTML.classList.add("Rev" + addjacentMines);
        myEvent.revealed = true;
        this.revealeAdjacents(i, j);
      }
    }
  }

  handleGridLeftClick(event) { //discover cell.
    if(this.startGame == "noClick"){     //noClick means the grid has no reveal cells yet 
      this.startGame=this.state[1];
      this.updateTime();                 //I start the timer as soon as the first cell is revealed
    }else if(this.startGame=="firstClick"){
      this.startGame=this.state[2];
    }
    let row = event.target.getAttribute('data-row');
    let col = event.target.getAttribute('data-col');
                                                                         //There might be a slight possibility that is wor null and col null.
                                                                         //Dont forget to handle that esxception
    if (row != null && col != null) {
      var myEvent = this.cellAt(row, col);
      if (myEvent.marked == false) {                                    //If it has a flag it shouldnt let user reveal the cell. Until the flag is removed
        event.target.classList.remove("notRev");
        if (myEvent.hasMine == true) {                                  //the player revealed a map END OF GAME
          this.startGame = this.state[3];
          event.target.classList.add("RevBomb");
          event.target.innerHTML=this.alerts.getOneFruit();
          this.alerts.printLose(this.cellsArrBombs, this.time );
        } else {                                                        //The user revealed a mine without a mine
          let addjacentMines = myEvent.addjacentMine;
          event.target.classList.add("Rev" + addjacentMines);
          myEvent.revealed = true;
          this.checkWin();
          if (addjacentMines == 0) {                                      //If it has no mines reveal all the addjacent cells with no mines
            this.revealeAdjacents(row, col);
          }
        }
      }
    }
  }

checkWin(){
  this.cellsRevealed++;
  if (this.cellsRevealed == ((this.tableData*this.tableRow)-this.amountMines)) {
    this.alerts.printWin();
  }
}

  handleGridRightClick(event) { //mark cell
    let row = event.target.getAttribute('data-row');
    let col = event.target.getAttribute('data-col');
    if (row != null && col != null) {                                                             //check if user clicked in the gap between two cells
    var myEvent = this.cellAt(row, col)
    if (myEvent.marked == true) {                                                                 //if the cell is revealed it shouldnt let the user mark it
    console.log("marked click");
      myEvent.marked = false;
      this.flags--;
      if (myEvent.hasMine==true) {
        this.flagsInMines--;
      }
      document.querySelector(`[data-col="${col}"][data-row="${row}"]`).innerHTML = ``;                //Here i grab the html instead of using the event because if they clicked the img instead of the cell it wont take the flag out.
    } else { //It is not marked
      if (event.target.className.includes("notRev")) {
        myEvent.marked = true;
        this.flags++;
        if (myEvent.hasMine==true) {
          if ((++this.flagsInMines) == this.amountMines) {
            this.alerts.printWin(cc);
          }
        }
        event.target.innerHTML = `<img class="flag" data-col="${myEvent.getCol()}" data-row="${myEvent.getRow()}" src="media/flag.png"" ></img>`;     //add col and row so that i can retrieve them and know which cell was clicked
      }
    }
   }
  }

  cellAt(row, col) {
    //go through all the cells
    for (var i = 0; i < this.cellsArr.length; i++) {
      if (this.cellsArr[i].getRow() == row && this.cellsArr[i].getCol() == col) {
        return this.cellsArr[i];
        break;
      }
    }
  }

  getFlags() {
    return this.flags;
  }

  updateTime(){ //Alex helped me with this function
    console.log(this.startGame);
      var date = new Date();
      var seconds=1;
      var printTime;
      this.time = setInterval(() =>{
        var aux = new Date().getTime(); //gives me the time for the first click obtains exact complete time
        printTime = aux-date;
        seconds = Math.floor((printTime % (1000*1200))/1000);
        if(this.startGame != "lose"){
          document.querySelector('#timer').innerHTML = seconds;
        }
      }, 1000);
  }

  resetTime(){
    console.log("reset time");
    this.startGame= this.state[0];
    if( this.time != null){
       clearInterval(this.time);
    }
    this.time=0;
    document.querySelector('#timer').innerHTML = this.time;
  }

}
