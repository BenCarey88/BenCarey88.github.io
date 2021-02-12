//functions to apply on key down event

import {print, newLine} from '../Utils/print.mjs';
import {Vector} from '../Utils/index.mjs';

var LEFT = 37;  //left arrow key
var UP = 38;    //up arrow key
var RIGHT = 39; //right arrow key
var DOWN = 40;  //down arrow key
var DRAW = 49;  //1 key
var ERASE = 50; //2 key

export function keyDown(event, screen) {
    var character = screen.character;
    switch (event.keyCode) {
        case UP:
            if(character.canJump) {
                character.upForce = character.jumpStrength;
            }
            break;
        case LEFT:
            character.leftForce = character.moveStrength;
            break;
        case RIGHT:
            character.rightForce = character.moveStrength;
            break;
        case DRAW:
            screen.drawMode = "DRAW"
            break;
        case ERASE:
            screen.drawMode = "ERASE"
            break;
        default:
            break;
    }
}