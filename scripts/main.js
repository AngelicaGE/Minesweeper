// Template and demo code (c) copyright 2019 Angelica Guemes, all rights reserved
console.log("JS working main.js");
'use strict'; //use the strict debugger compiler

const DEBUG = true; //constants are uppercase. for visibility
import App from './app.js'; // with default word. and allows to change App to any other name

document.addEventListener('DOMContentLoaded', event => { //equivalent to function main
    //cool magic here!
    const app = new App(); //my singleton. The one thing to rule them all
    app.run();
});