//Rectangle shape class

import {constants} from '../Utils/constants.mjs';
import {Vector} from '../Utils/Maths/vector.mjs';
import {Rotation} from '../Utils/Maths/rotation.mjs';
import {BBox} from './bbox.mjs';
import {Shape} from './shape.mjs';

export class Rect extends Shape {

    constructor(centre, width, height, orientation, vertices) {
        
        if (vertices == undefined) {
            var rot = new Rotation(orientation);
            vertices = {
                v1: new Vector(-width/2, -height/2),
                v2: new Vector(width/2, -height/2),
                v3: new Vector(width/2, height/2),
                v4: new Vector(-width/2, height/2)
            }
            for (var key in vertices) {
                vertices[key] = rot.vMult(vertices[key]).plus(centre);
            }
        }
        vertices._centre = centre;
        super(vertices);

        this.name = constants.RECTANGLE;

        this.width = width;
        this.height = height;
        this._orientation = orientation;
    }

    //return bounding box
    bbox() {
        if (this._bbox == undefined) {
            this._bbox = new BBox(
                Math.min(this.v1.x, this.v2.x, this.v3.x, this.v4.x),
                Math.min(this.v1.y, this.v2.y, this.v3.y, this.v4.y),
                Math.max(this.v1.x, this.v2.x, this.v3.x, this.v4.x),
                Math.max(this.v1.y, this.v2.y, this.v3.y, this.v4.y)
            );
        }
        return this._bbox;
    }

    //clone this from new points, passing in vertices for speed
    clone(points, orientation) {
        return new Rect(
            points._centre, this.width, this.height, orientation,
            {v1: points.v1, v2: points.v2, v3: points.v3, v4: points.v4}
        );
    }

    //return centre of rectangle
    centre() {
        return this._centre;
    }

    //return orientation of this. It is assumed that orientation 0
    //has vertices going clockiwse from top left.
    orientation() {
        if (this._orientation == undefined) {
            this._orientation = Math.atan2(
                this.v2.y - this.v1.y, this.v2.x - this.v1.x
            );
        }
        return this._orientation;
    }

    //draw rectangle to ctx
    draw(ctx) {
        ctx.fillStyle = "red";
		ctx.save();
		ctx.translate(this.centre().x, this.centre().y);
		ctx.rotate(this.orientation());
        ctx.fillRect(
            -this.width * 0.5, -this.height * 0.5, 
            this.width, this.height
        );
		ctx.restore();
    }

    //string representation
    string() {
        return (
            `Rectangle[Centre ${this.centre().string()},
            Width ${this.stringify(this.width)},
            Height ${this.stringify(this.height)},
            Orientation ${this.stringify(this.orientation())}]`
            //${this.v1.string()}, ${this.v2.string()},
            //${this.v3.string()}, ${this.v4.string()}]`
        );
    }

}
