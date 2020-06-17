// Template and demo code (c) copyright 2019 Angelica Guemes, all rights reserved
/*
This file contains the retroalimentation for the user after it has won or lost the game.
It shows the modals for both cases and it contains all the functions to make the food pop in random order after the user loses.
*/
'use strict'; //use the strict debugger compiler

export default class Alerts{
  constructor(){
    this.myPopSound1=this.initPopSound(1);    //pop sound.   
    this.myPopSound2=this.initPopSound(2);    //pop sound.
    this.myPopSound3=this.initPopSound(3);    //pop sound.
    this.time;                                //time that helps me pop food after some seconds
    this.i=0;                                 //to go through all the bomb elements. Made it global because i dont use a foor loop and i need to keep track of the index
  }

  printWin(time)
  {
    swal({                                                          //sweetmodal. retroalimentation after winning
       title: "Good job!",
       text: `You finished in ${time} seconds`,
       icon: "success",
       button: "Ok!",
     });
     document.querySelector("#grid").classList.add("noEvent")          //I dont let user reveal more cells if it has already won   //dont allow user to click 
   }
 
   printLose(cellsArrBombs, event)
   {
     this.popFood(cellsArrBombs)                                //Here I make all the fruits appear
     document.querySelector("#board").classList.add('noEvent'); //dont allow user to click 
   }

   //It is called on the constructor. Initialices all pop sounds one by one. depending on the num it receives as a parameter.
  initPopSound(num){
    switch (num) {
      case 1:
        return new buzz.sound("./music/reveal_bombs/MUS_Pop1_SoundEffect_AG.wav", {   //create sound
          preload: true,
          autoplay: false,      //So it doesnt starts playing the moment it is created
          loop: false           //play only once
        });
      break;
      case 2:
      return new buzz.sound("./music/reveal_bombs/MUS_Pop2_SoundEffect_AG.wav", {
        preload: true,
        autoplay: false,
        loop: false
      });
      break;
      case 3:
      return new buzz.sound("./music/reveal_bombs/MUS_Pop3_SoundEffect_AG.wav", {
        preload: true,
        autoplay: false,
        loop: false
      });
      break;
      default:
        console.log("Sound loaded problems in alerts.js");
    }
  }

  getOneFruit(){  //returns an image tag with a different random food
    switch (Math.floor((Math.random() * 10) + 1)) {
      case 1:
        return `<img src="media/apple.png" width="35px" height="35px">`;
      break;
      case 2:
        return `<img src="media/banana.png" width="35px" height="35px">`;
      break;
      case 3:
          return `<img src="media/carrot.png" width="35px" height="35px">`;
      break;
      case 4:
        return `<img src="media/chicken.png" width="35px" height="35px">`;
      break;
      case 5:
          return `<img src="media/hamburger.png" width="35px" height="35px">`;
      break;
      case 6:
          return `<img src="media/lettuce.png" width="35px" height="35px">`;
      break;
      case 7:
        return `<img src="media/orange.png" width="35px" height="35px">`;
      break;
      case 8:
        return `<img src="media/pizza.png" width="35px" height="35px">`;
      break;
      case 9:
          return `<img src="media/steak.png" width="35px" height="35px">`;
      break;
      case 10:
        return `<img src="media/tomato.png" width="35px" height="35px">`;
      break;
        return `<img src="media/apple.png" width="35px" height="35px">`;
      default:
      return `<img src="media/apple.png" width="35px" height="35px">`; //If there happens some problem i just return an apple
    }
  }

  revealFruit(i, cellsArrBombs, fruit)
  {
    let element = document.querySelector(`[data-col="${cellsArrBombs[i].getCol()}"][data-row="${cellsArrBombs[i].getRow()}"]`);   //get the actual html table data
    if (element.innerHTML == '') {                     //I need to check they are empty because the first clicked mine was revealed on map.js and i dont want to override the food
      switch (Math.floor((Math.random() * 4) + 1) )  { // get one sound randomly and play it before showing the food on screen
        case 1:
          this.myPopSound1.setVolume(100);
          this.myPopSound1.play();
        break;
        case 2:
          this.myPopSound2.setVolume(100);
          this.myPopSound2.play();
        break;
        case 3:
          this.myPopSound3.setVolume(100);
          this.myPopSound3.play();
        break;
        default:
      }
      element.innerHTML = fruit;          //set the food to the html
      element.classList.add("RevBomb");   //so the background is nice revealed cell
    }
   }

  popFood(cellsArrBombs){                                                 //receives the array with all the bombs
      document.querySelector("#board").classList.add("noEvent");          //disallow clicks while the food is popping. Avoids buggs. Like changing level while cells are being revealed
      this.time = setInterval(() =>{
        if(this.i < cellsArrBombs.length){
          this.revealFruit(this.i++, cellsArrBombs, this.getOneFruit());
        }else{
          this.resetTime();                                                 //If i am done with all my array I set the interval back to zero. 
          document.querySelector("#board").classList.remove("noEvent")
          document.querySelector("#grid").classList.add("noEvent")          //I dont let user reveal more cells if it has already lost
        }
      }, Math.floor((Math.random() * 500) + 50));

  }

  resetTime(){
    console.log("reset");
    if( this.time != null){
       clearInterval(this.time);
       swal({
        title: "Don´t give up!",
        text: `Time played ${time}`,
        icon: `warning`,
        button: "Ok!",
      }); 
    }
  }
}
//Diego and Eser helped me with this part
