import {print, newLine} from './Utils/print.mjs';
import {Game} from './game.mjs';
import {Level} from './level.mjs';

var game = new Game(
    [new Level()]
);
game.startLevel(0);

print("TEST");


// import {Screen} from './screen.js';


// var screen = new Screen();

// print(screen.constructor.name)

// screen.init();

// screen.run();

// print("sfdghjkl;");


// var rot = new Rotation(0);
// print(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(rot.constructor))).name);


// var constructor = rot.constructor;
// var baseName;
// do {
//     baseName = constructor.name;
//     print(baseName);
//     constructor = Object.getPrototypeOf(constructor);
// } while(constructor.name != "")

// print(baseName);