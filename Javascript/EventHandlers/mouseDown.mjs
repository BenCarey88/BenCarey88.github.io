//functions to apply on mouse down event

import {print, newLine} from '../Utils/print.mjs';
import {Vector} from '../Utils/index.mjs';

export function mouseDown(event, screen) {
    screen.clicked = true;
    screen.pos1 = new Vector(
        event.clientX - screen.canvas.offsetLeft,
        event.clientY - screen.canvas.offsetTop
    );
}