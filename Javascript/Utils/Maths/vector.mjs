///Vector class

import {print} from '../print.mjs';
import {Base} from '../base.mjs';

export class Vector extends Base {
    
    //construct vector from x, y components
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    //compare if this == vec
    eq(vec) {
        return (
            this.floatEq(this.x, vec.x) &&
            this.floatEq(this.y, vec.y)
        );
    }

    //return size of this
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    //return this + vec
    plus(vec) {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }

    //this += vec
    plusEq(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    //return this - vec
    minus(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }

    //this -= vec
    minusEq(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    //return -this
    negative() {
        return new Vector(-this.x, -this.y);
    }

    //return scalar * this
    sMult(scalar) {
        return new Vector(scalar * this.x, scalar * this.y);
    }

    //this *= scalar
    sMultEq(scalar) {
        this.x *= scalar; 
        this.y *= scalar;
    }

    //return unit vector in direction of this
    unit() {
        return this.sMult(1/this.magnitude())
    }

    //return dot product of this with vec
    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    //return vector orthogonal (perpendicular) to this
    orthog() {
        return new Vector(this.y, -this.x);
    }

    //return component of this along direction
    getComponent(direction) {
        var dir = direction.unit();
        return dir.sMult(this.dot(dir));
    }

    //set component of this along direction to zero (ie. take the perpendicular component)
    setComponentToZero(direction) {
        var dir = direction.unit();
        var perp = dir.orthog();
        var multiplier = this.dot(perp);
        var result = perp.sMult(multiplier);
        this.x = result.x;
        this.y = result.y;
    }

    //string representation
    string() {
        return `(${this.stringify(this.x)}, ${this.stringify(this.y)})`;
    }

}
