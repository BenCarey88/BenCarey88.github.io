//functions to apply on mouse move event

import {print, newLine} from '../Utils/print.mjs';
import {Vector, Line} from '../Utils/index.mjs';

import {isInside, isPointInside} from '../Movement/collisionDetection.mjs';

export function mouseMove(event, screen) {

    var mousePos = new Vector(
        event.clientX - screen.canvas.offsetLeft,
        event.clientY - screen.canvas.offsetTop
    );

    switch(screen.drawMode) {
        
        case "DRAW":
            screen.pos2 = mousePos;
            var line = new Line(screen.pos1, screen.pos2);
            if (screen.clicked && line.length()>screen.minLineLength) {
                if(!isInside(screen.character, line)) {
                    screen.lines.push(line);
                }
                screen.pos1 = screen.pos2;
            }
            break;
        
        case "ERASE":
            if(screen.clicked) {
                for(var i=0; i<screen.lines.length; i++) {
                    var line = screen.lines[i];
                    if(isPointInside(mousePos, line)) {
                        screen.lines.splice(i,1);
                    }
                }
            }
            break;

        default:
            break;

    }
}