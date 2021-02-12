//Rotation class

import {print} from '../print.mjs';
import {Matrix} from './matrix.mjs'

export class Rotation extends Matrix {

    //construct matrix from rotation angle
    constructor(angle) {
        super(
            Math.cos(angle),
            -Math.sin(angle),
            Math.sin(angle),
            Math.cos(angle)
        );
        this.angle = angle;
    }

}