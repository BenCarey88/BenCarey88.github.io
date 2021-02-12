//utility functions

import {constants} from './constants.mjs';

export var utils = {};

utils.floatEq = function(x, y) {
    return Math.abs(x - y) < constants.TOLERANCE;
}

utils.lessOrEq = function(x, y) {
    return utils.floatEq(x, y) || x < y;
}

utils.greaterOrEq = function(x, y) {
    return utils.floatEq(x, y) || x > y;
}
