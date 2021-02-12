//Base class for all classes to inherit from, to allow some easy access custom functions

import {print} from './print.mjs';
import {utils} from './functionUtils.mjs';

export class Base {

    constructor() {
    }

    //compare two floats
    floatEq(x, y) {
        return utils.floatEq(x, y);
    }
    lessOrEq(x, y) {
        return utils.lessOrEq(x,y);
    }
    greaterOrEq(x, y) {
        return utils.greaterOrEq(x,y);
    }

    //convert a float to a 1dp/0dp decimal
    stringify(float) {
        if(float.toString().includes(".")) {
            return float.toFixed(1);
        }
        else {
            return float.toString();
        }
    }

    //return string representation of class (normally should be overridden)
    string() {
        return `${this.constructor.name} instance`;
    }

    //print string representation to screen
    print() {
        print(this.string());
    }
}