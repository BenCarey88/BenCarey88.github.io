//Circle shape class

import {constants} from '../Utils/constants.mjs';
import {BBox} from './bbox.mjs';
import {Shape} from './shape.mjs';

export class Circle extends Shape {

    constructor(centre, rad) {
        super(
            {_centre: centre},
            {rad: rad},
        );
        this.name = constants.CIRCLE;
    }

    bbox() {
        if (this._bbox == undefined) {
            this._bbox = new BBox(
                this.centre().x - this.rad,
                this.centre().y - this.rad,
                this.centre().x + this.rad,
                this.centre().y + this.rad
            );
        }
        return this._bbox;
    }

    centre() {
        return this._centre;
    }

    orientation() {
        return 0;
    }

    clone(points, orientation) {
        return new Circle(points._centre, this.rad);
    }

    //draw circle to ctx
    draw(ctx) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(
            this.centre().x, this.centre().y,
            this.rad, 0, 2 * Math.PI
        );
        ctx.fill();
        ctx.closePath();
    }

    //string representation
    string() {
        return `Circle[${this.centre().string()}, rad ${this.stringify(this.rad)}]`;
    }

}
