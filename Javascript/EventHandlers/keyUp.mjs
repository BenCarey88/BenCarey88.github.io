//functions to apply on key up event

import {print, newLine} from '../Utils/print.mjs';
import {Vector} from '../Utils/index.mjs';

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

export function keyUp(event, screen) {
    var character = screen.character;
    switch (event.keyCode) {
        case UP:
            character.upForce = 0;
            break;
        case LEFT:
            character.leftForce = 0;
            break;
        case RIGHT:
            character.rightForce = 0;
            break;
        default:
            break;
    }
}