//base character class for player characters and enemies

import {print, newLine} from '../Utils/print.mjs';
import {Base, constants, Vector, Rotation} from '../Utils/index.mjs';

export class Character extends Base {

    // construct character with position on screen
    constructor(shape, vel, acc) {
        super();
        this.shape = shape;

        this.pos = this.shape.centre();
        if (vel==undefined){
            vel = constants.ZERO_VEC;
        }
        if (acc==undefined){
            acc = constants.ZERO_VEC;
        }
        this.vel = vel;
        this.acc = acc;
    }

    translate(vec) {
        return new Character(
            this.shape.translate(vec),
            this.vel,
            this.acc,
        )
    }

    translateEq(vec) {
        this.shape.translateEq(vec);
    }

    rotate(angle, centre) {
        var rot = new Rotation(angle);
        return new Character(
            this.shape.rotate(angle, centre),
            rot.vMult(this.vel),
            rot.vMult(this.acc),
        )
    }

    rotateEq(angle, centre) {
        var rot = new Rotation(angle);
        this.shape.rotateEq(angle, centre);
        this.vel = rot.vMult(this.vel);
        this.acc = rot.vMult(this.acc);
    }

    //move character responding to (for now stationary) obstacles
    //obstacles is list of shapes for now, may be list of objects/characters later
    move(obstacles) {

    }

}