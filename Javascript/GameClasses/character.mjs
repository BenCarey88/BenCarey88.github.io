//character class for player character

import {print, newLine} from '../Utils/print.mjs';
import {Vector, Rotation} from '../Utils/index.mjs';

export class Character {

    // construct character with position on screen
    constructor(x, y, vx=0, vy=0, ax=0, ay=0) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(vx, vy);
        this.acc = new Vector(ax, ay);
        
        this.rad = 30;
        this.moveStrength = 3;
        this.jumpStrength = 10;
        this.canJump = false;
        this.maxVel = 8;

        this.rightForce = 0;
        this.leftForce = 0;
        this.upForce = 0;
    }

    rotate(angle, centre) {
        var rot = new Rotation(angle);
        if (centre == undefined) {
            centre = new Vector(0, 0);
        }
        var newPos = this.pos.minus(centre);
        newPos = rot.vMult(newPos);
        var newVel = rot.vMult(this.vel);
        var newAcc = rot.vMult(this.acc);
        newPos.plusEq(centre)

        return new Character(
            newPos.x, newPos.y, 
            newVel.x, newVel.y,
            newAcc.x, newAcc.y
        );
    }

}