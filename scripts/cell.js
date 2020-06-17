// Template and demo code (c) copyright 2019 Angelica Guemes, all rights reserved
export default class Cell{
  constructor(rowParam, colParam) {
      this.position = {
          row: rowParam,
          col:colParam
      };
      this.marked = false; //I understand better marked than flagged
      this.hasMine = false;
      this.revealed = false; //If the user left click
      this.addjacentMine = 0;
  }
  getRow(){
    return this.position.row;
  }
  getCol(){
    return this.position.col;
  }
}

