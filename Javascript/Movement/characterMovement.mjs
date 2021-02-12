// functions for character movement

import {print, newLine} from '../Utils/print.mjs';
import {Vector, Rotation} from '../Utils/index.mjs';

import {findIntersection, canJump} from './collisionDetection.mjs';

function applyForces(screen) {
    var character = screen.character;
    //gravity
    character.acc = new Vector(0, 0.3);
    //internal forces
    if(character.upForce != 0) {    
        character.acc.y = -character.upForce;
    }
    character.upForce = 0;
    character.acc.x += character.rightForce - character.leftForce;
    //resistance
    //character.acc.minusEq(character.vel.sMult(0.005));
    // var maxAcc = 5;
    // if (character.acc.magnitude() > maxAcc) {
    //     character.acc = character.acc.unit().sMult(maxAcc);
    // }
}

function collisonResponse(screen) {
    var character = screen.character;
    var vel = character.vel;
    var perpVel = vel.orthog();
    var pos = character.pos;

    //in case there are multiple intersections, use dotProdCompare to determine
    //which is furthest along direction of travel, and then use that one
    var dotProductCompare = 0;
    //unless there are intersections to the right and left of the velocity,
    //in which case the ball should be stopped
    var intersectionToLeft = false;
    var intersectionToRight = false;
    //perpLine stores the vector perpendicular to the line of intersection
    //if intersection occurs, otherwise it is false
    var perpLine = false;
    
    for(var i=0; i<screen.lines.length; i++) {
        var line = screen.lines[i];
        var intersection = findIntersection(character, line);
        if (intersection) {
            
            var tempPerpLine = intersection.minus(pos);
            var dotProduct = vel.dot(tempPerpLine);

            if(tempPerpLine.dot(perpVel) > 0) {
                intersectionToRight = true;
            }
            else {
                intersectionToLeft = true;
            }

            if (dotProduct > dotProductCompare) {
                dotProductCompare = dotProduct;
                perpLine = tempPerpLine;
            }
        }
    }
    if (intersectionToLeft && intersectionToRight) {
        perpLine = vel;
    }
    if(perpLine) {
        vel.minusEq(vel.getComponent(perpLine).sMult(1 + screen.coe));
        //vel.setComponentToZero(perpLine);
    }

    const check = (line) => canJump(character, line, 10);
    character.canJump = screen.lines.some(check);
}

export function moveCharacter(screen) {
    applyForces(screen);
    var character = screen.character;
    character.vel.plusEq(character.acc);
    if(character.vel.x > character.maxVel) {
        character.vel.x = character.maxVel;
    }
    if(character.vel.x < -character.maxVel) {
        character.vel.x = -character.maxVel;
    }
    // if (character.acc.x == 0) {
    //     character.vel.x *= 0.95;
    // }
    collisonResponse(screen);
    // var maxVel = 10;
    // if (character.vel.magnitude() > maxVel) {
    //     character.vel = character.vel.unit().sMult(maxVel);
    // }
    character.pos.plusEq(character.vel);
}