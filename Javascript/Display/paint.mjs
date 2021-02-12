//functions for displaying user-made paint

import {print, newLine} from '../Utils/print.mjs';

export function paintLines(screen) {
    for(var i=0; i<screen.lines.length; i++) {
        var line = screen.lines[i];
        //line = line.rotate(-line.elevation());
        screen.ctx.fillStyle = "black";

        screen.ctx.beginPath();
        screen.ctx.moveTo(line.x1, line.y1);
        screen.ctx.lineTo(line.x2, line.y2);
        screen.ctx.stroke();
        screen.ctx.lineWidth = line.width;
        screen.ctx.closePath();

        screen.ctx.beginPath();
        screen.ctx.arc(
            line.x1, line.y1, line.width/2, 0, 2 * Math.PI
        );
        screen.ctx.fill();
        screen.ctx.closePath();

        screen.ctx.beginPath();
        screen.ctx.arc(
            line.x2, line.y2, line.width/2, 0, 2 * Math.PI
        );
        screen.ctx.fill();
        screen.ctx.closePath();
    }
}