// functions for collision

import {print, newLine} from '../Utils/print.mjs';
import {Vector, Rotation} from '../Utils/index.mjs';

//returns point of intersection of character and line if one exists
export function findIntersection(character, line) {
    var intersection = false;
    var angle = line.elevation();
    var pivot = line.centre();
    character = character.rotate(-angle, pivot);
    line = line.rotate(-angle, pivot);
    var vel = character.vel;
    var pos = character.pos;
    var rad = character.rad;
    var width = line.width/2;

    var intersectTop = (
        vel.y > 0 &&
        pos.x > line.x1 &&
        pos.x < line.x2 &&
        pos.y + rad > line.y1 - width &&
        pos.y + rad < line.y1 + width
    );
    var intersectBottom = (
        vel.y < 0 &&
        pos.x > line.x1 &&
        pos.x < line.x2 &&
        pos.y - rad > line.y1 - width &&
        pos.y - rad < line.y1 + width
    );
    var leftVec = line.pos1.minus(pos);
    var intersectLeft = (
        leftVec.magnitude() < rad + width &&
        vel.dot(leftVec) > 0
    );
    var rightVec = line.pos2.minus(pos);
    var intersectRight = (
        rightVec.magnitude() < rad + width &&
        vel.dot(rightVec) > 0
    );

    if(intersectTop) {
        intersection = pos.plus(new Vector(0, rad));
    }
    else if(intersectBottom) {
        intersection = pos.minus(new Vector(0, rad));
    }
    else if(intersectLeft) {
        intersection = pos.plus(leftVec.unit().sMult(rad));
    }
    else if(intersectRight) {
        intersection = pos.plus(rightVec.unit().sMult(rad));
    }

    if(intersection) {
        var rot = new Rotation(angle);
        intersection.minusEq(pivot);
        intersection = rot.vMult(intersection);
        intersection.plusEq(pivot);
    }
    return intersection;
}

//returns true if character is inside line, false otherwise
export function isInside(character, line) {
    var angle = line.elevation();
    var pivot = line.centre();
    character = character.rotate(-angle, pivot);
    line = line.rotate(-angle, pivot);
    var pos = character.pos;
    var rad = character.rad;
    var width = line.width/2 - 1;

    var intersectVertical = (
        pos.x > line.x1 &&
        pos.x < line.x2 &&
        pos.y + rad > line.y1 - width &&
        pos.y - rad < line.y1 + width
    );
    var leftVec = line.pos1.minus(pos);
    var intersectLeft = (
        leftVec.magnitude() < rad + width
    );
    var rightVec = line.pos2.minus(pos);
    var intersectRight = (
        rightVec.magnitude() < rad + width
    );

    return intersectVertical || intersectLeft || intersectRight;
}

//returns true if character is intersecting a line from above and hence can jump
export function canJump(character, line, tol=10) {
    var angle = line.elevation();
    var pivot = line.centre();
    character = character.rotate(-angle, pivot);
    line = line.rotate(-angle, pivot);
    var pos = character.pos;
    var rad = character.rad;
    var width = line.width/2;

    var intersectVertical = (
        pos.x > line.x1 &&
        pos.x < line.x2 &&
        pos.y + rad > line.y1 - width - tol &&
        pos.y - rad < line.y1 + width + tol
    );
    var leftVec = line.pos1.minus(pos);
    var intersectLeft = (
        leftVec.magnitude() < rad + width + tol
    );
    var rightVec = line.pos2.minus(pos);
    var intersectRight = (
        rightVec.magnitude() < rad + width + tol
    );

    return intersectVertical || intersectLeft || intersectRight;
}

//return true if point is inside line
export function isPointInside(point, line) {
    var angle = line.elevation();
    var pivot = line.centre();
    line = line.rotate(-angle, pivot);
    var width = line.width/2;

    var intersectVertical = (
        point.x > line.x1 &&
        point.x < line.x2 &&
        point.y > line.y1 - width &&
        point.y < line.y1 + width
    );
    var leftVec = line.pos1.minus(point);
    var intersectLeft = (
        leftVec.magnitude() < width
    );
    var rightVec = line.pos2.minus(point);
    var intersectRight = (
        rightVec.magnitude() < width
    );

    return intersectVertical || intersectLeft || intersectRight;
}