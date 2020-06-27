// Template and demo code (c) copyright 2019 Angelica Guemes, all rights reserved
'use strict'; //use the strict debugger compiler

console.log("JS working app.js");
import Map from './map.js'
import Cell from './cell.js'
import Menu from './menu.js'
import Alerts from './alerts.js'

export default class App{
  constructor(){
    this.mySound = this.initSound();
    this.myPopSound1 = this.initPopSound(1);
    this.myPopSound2 = this.initPopSound(2);
    this.myPopSound3 = this.initPopSound(3);
    this.alerts= new Alerts();//this.myPopSound1, this.myPopSound2, this.myPopSound3);
    this.map = new Map(this.alerts);
    this.menu = new Menu(this.map, this.mySound);
    this.alerts.menu = this.menu;
    this.initMenuHandlers();
    this.printMenu();
    this.startGame();
  }

  run(){  }

  initMenuHandlers(){
    if(this.map.startGame != "lose"){                                                     //NOT WORKIN
    //choose a level
    document.querySelector('.levels').addEventListener('click', (event) => {
      this.menu.handleLevelClick(event)
    });
    //turn sound on and off
    document.querySelector('.sound-hud').addEventListener('click', (event) => {
              this.menu.handleSoundClick(event)
    });
    }

  }

  updateTime(){
    document.querySelector('.grid').addEventListener('click', (event) => {
      if(this.map.startGame ==this.state[0]){
        console.log("game true");
        this.menu.updateTime();
      }
    });
  }

  initSound(){
    return new buzz.sound("./music/MUS_GamePlay_Loop1_AG_ArrozConPollo.wav", {
      preload: true,
      autoplay: true,
      loop: true
    });
  }

  initPopSound(num){
    switch (num) {
      case 1:
        return new buzz.sound("./music/reveal_bombs/MUS_Pop1_SoundEffect_AG.wav", {
          preload: true,
          autoplay: false,
          loop: true
        });
      break;
      case 2:
      return new buzz.sound("./music/reveal_bombs/MUS_Pop2_SoundEffect_AG.wav", {
        preload: true,
        autoplay: false,
        loop: true
      });
      break;
      case 3:
      return new buzz.sound("./music/reveal_bombs/MUS_Pop3_SoundEffect_AG.wav", {
        preload: true,
        autoplay: false,
        loop: true
      });
      break;
      default:

    }
  }

  startGame(){
    document.addEventListener('keydown',(event) =>{
      if(event.keyCode == 32) {
          document.querySelector('#wholeGame').classList.remove('hidden');
          document.querySelector('#wholeGame').classList.add('visible');
          document.querySelector('#welcomeMenu').innerHTML = '';
          document.querySelector('#welcomeMenu').classList.add('hidden');
         
            try {
              this.mySound.setVolume(70);
              this.mySound.play();
            } catch (error) {
              console.log(error);
            }
          
      }else if(event.keyCode == 13){
        swal("Game instructions!", `The object of the game of minesweeper is to locate all the mines as quickly as possible. Specifically, the game of minesweeper is won at the point when all squares that are not mines are clicked open.

        The game of minesweeper is lost when a square that the player clicks open contains a mine. Or (new addition to the game) if you flag all mines.
        
        The game of minesweeper begins upon the opening of the first square the player clicks open, which starts the timer.
        
        The grid of mines for a board is pre-generated before the start of the game. The first square clicked never contains a mine. If it did contain a mine in the board pre-generation, the mine is moved to the upper-left hand corner of the board, and if that was a mine, the next square over to the right, and so on.
        
        There are two ways to click open a square: left-clicking the square and chording.
        
        To click open a square by left-clicking, click the left mouse button. The square the cursor is over at the point of release of the left mouse button is the square that is opened.
        
        When a square is successfully opened without containing a mine, it shows a number. The number indicates the number of mines that exist in the eight squares touching the square the number was in.
        
        If the number would have been a 0, the number 0 is not shown, and all squares touching that square are opened as well.`);
      }
    });
  }

  printMenu(){
    document.querySelector('#wholeGame').classList.add('hidden');
    document.querySelector('#welcomeMenu').innerHTML = '<img id="menuImg" src="./media/start.png">';
  }

}
