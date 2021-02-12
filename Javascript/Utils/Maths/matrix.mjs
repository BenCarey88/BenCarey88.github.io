//Matrix class

import {print} from '../print.mjs';
import {Base} from '../base.mjs';
import {Vector} from './vector.mjs';

export class Matrix extends Base {

    //construct matrix from 4 floats
    constructor(a, b, c, d) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    //compare if this == mat
    eq(mat) {
        return (
            this.floatEq(this.a, mat.a) &&
            this.floatEq(this.b, mat.b) &&
            this.floatEq(this.c, mat.c) &&
            this.floatEq(this.d, mat.d)
        );
    }

    //return this + mat
    plus(mat) {
        return new Matrix(
            this.a + mat.a,
            this.b + mat.b,
            this.c + mat.c,
            this.d + mat.d
        );
    }

    //this += mat
    plusEq(mat) {
        this.a += mat.a;
        this.b += mat.b;
        this.c += mat.c;
        this.d += mat.d;
    }

    //return this - mat
    minus(mat) {
        return new Matrix(
            this.a - mat.a,
            this.b - mat.b,
            this.c - mat.c,
            this.d - mat.d
        );
    }

    //this -= mat
    minusEq(mat) {
        this.a -= mat.a;
        this.b -= mat.b;
        this.c -= mat.c;
        this.d -= mat.d;
    }

    //return -this
    negative() {
        return new Matrix(
            -this.a,
            -this.b,
            -this.c,
            -this.d
        );
    }

    //return scalar * this
    sMult(scalar) {
        return new Matrix(
            scalar * this.a,
            scalar * this.b,
            scalar * this.c,
            scalar * this.d
        );
    }

    //this *= scalar
    sMultEq(scalar) {
        this.a *= scalar;
        this.b *= scalar;
        this.c *= scalar;
        this.d *= scalar;
    }

    //return this * vec
    vMult(vec) {
        return new Vector(
            this.a * vec.x + this.b * vec.y,
            this.c * vec.x + this.d * vec.y
        );
    }

    //return this * mat
    mMult(mat) {
        return new Matrix(
            this.a * mat.a + this.b * mat.c,
            this.a * mat.b + this.b * mat.d,
            this.c * mat.a + this.d * mat.c,
            this.c * mat.b + this.d * mat.d
        );
    }

    //this *= mat
    mMultEq(mat) {
        var tempA = this.a * mat.a + this.b * mat.c;
        var tempB = this.a * mat.b + this.b * mat.d;
        var tempC = this.c * mat.a + this.d * mat.c;
        var tempD = this.c * mat.b + this.d * mat.d;
        this.a = tempA;
        this.b = tempB;
        this.c = tempC;
        this.d = tempD;
    }

    //return determinant of this
    det() {
        return this.a * this.d - this.b * this.c;
    }

    //return inverse of this
    inverse() {
        if (this.det() != 0) {
            var cofactorMat = new Matrix(
                this.d, -this.b, -this.c, this.a
            );
            return cofactorMat.sMult(1/this.det());
        }
        else {
            throw new Error("trying to invert invertible matrix");
        }
    }

    //string representation
    string() {
        return (
            `|${this.stringify(this.a)},
            ${this.stringify(this.b)}| <br/>
            |${this.stringify(this.c)},
            ${this.stringify(this.d)}|`
        );
    }

}
