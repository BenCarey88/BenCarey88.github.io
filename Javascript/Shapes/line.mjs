//Line shape class

import {constants} from '../Utils/constants.mjs';
import {Vector} from '../Utils/Maths/index.mjs';
import {BBox} from './bbox.mjs';
import {Shape} from './shape.mjs';

export class Line extends Shape {

    //construct line from two position vectors
    constructor(pos1, pos2, width=20, orientation) {
        super({pos1:pos1, pos2:pos2}, {width: width});
        this.update();

        this.name = constants.LINE;

        this.width = width;
        this._orientation = orientation;
    }

    //get x and y coordinates from the two pos vectors
    update() {
        super.update();

        this.x1 = this.pos1.x;
        this.x2 = this.pos2.x;
        this.y1 = this.pos1.y;
        this.y2 = this.pos2.y;
        this._centre = undefined;
    }

    bbox() {
        if (this._bbox == undefined) {
            this._bbox =  new BBox(
                Math.min(this.x1, this.x2) - this.width * 0.5,
                Math.min(this.y1, this.y2) - this.width * 0.5,
                Math.max(this.x1, this.x2) + this.width * 0.5,
                Math.max(this.y1, this.y2) + this.width * 0.5,
            );
        }
        return this._bbox;
    }

    clone(points, orientation) {
        return new Line(
            points.pos1, points.pos2, this.width, orientation
        );
    }

    //return length of this
    length() {
        if (this._length == undefined) {
            var lineVec = this.pos1.minus(this.pos2);
            this._length = lineVec.magnitude();
        }
        return this._length;
    }

    //return centre of line
    centre() {
        if (this._centre == undefined) {
            this._centre = new Vector(
                (this.x1 + this.x2) * 0.5,
                (this.y1 + this.y2) * 0.5
            );
        }
        return this._centre;
    }

    //DEPRECATE:
    //return angle of elevation of line
    elevation() {
        return Math.atan2(
            this.y2 - this.y1, this.x2 - this.x1
        );
    }

    orientation() {
        if (this._orientation == undefined) {
            this._orientation = Math.atan2(
                this.y2 - this.y1, this.x2 - this.x1
            );
        }
        return this._orientation;
    }

    //draw line to ctx
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.lineWidth = this.width;

        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
            this.x1, this.y1, this.width/2, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(
            this.x2, this.y2, this.width/2, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.closePath();
    }

    //string representation
    string() {
        return `Line[${this.pos1.string()} to ${this.pos2.string()}]`;
    }

}