import {print, newLine} from '../Utils/print.mjs';
import {utils,  constants} from '../Utils/index.mjs';
import {Line, Circle, Rect, BBox} from '../Shapes/index.mjs';

//check if circ1 intersects circ2
export function collisionCircCirc(circ1, circ2) {
    return utils.lessOrEq(
        (circ1.centre().minus(circ2.centre())).magnitude(),
        circ1.rad + circ2.rad
    );
}

//check if circle intersects line
export function collisionCircLine(circle, line) {
    
    if(!circle.bboxCompare(line)) {
        return false;
    }

    var angle = line.orientation();
    line = line.rotate(-angle);
    circle = circle.rotate(-angle);
    var centre = circle.centre();

    //line left
    if (centre.x < line.x1) {
        return utils.lessOrEq(
            (line.pos1.minus(centre)).magnitude(),
            circle.rad + line.width * 0.5
        );
    }
    //line right
    else if (centre.x > line.x2) {
        return utils.lessOrEq(
            (line.pos2.minus(centre)).magnitude(),
            circle.rad + line.width * 0.5
        );
    }
    //line top
    else if (centre.y <= line.y1) {
        return utils.greaterOrEq(
            centre.y + circle.rad,
            line.y1 - line.width * 0.5
        );
    }
    //line bottom
    else {
        return utils.lessOrEq(
            centre.y - circle.rad,
            line.y1 + line.width * 0.5
        );
    }
}

//check if circle intersects rect
export function collisionCircRect(circle, rect) {

    if(!circle.bboxCompare(rect)) {
        return false;
    }

    var angle = rect.orientation();
    rect = rect.rotate(-angle);
    circle = circle.rotate(-angle);
    var centre = circle.centre();

    var xmin = rect.v1.x;
    var ymin = rect.v1.y;
    var xmax = rect.v3.x;
    var ymax = rect.v3.y;

    //rect left
    if (centre.x < xmin) {
        //rect top
        if (centre.y < ymin) {
            return utils.lessOrEq(
                (rect.v1.minus(centre)).magnitude(), circle.rad
            );
        }
        //rect bottom
        else if (centre.y > ymax) {
            return utils.lessOrEq(
                (rect.v4.minus(centre)).magnitude(), circle.rad
            );
        }
        //rect middle (height)
        else {
            return utils.greaterOrEq(centre.x + circle.rad, xmin);
        }
    }
    //rect right
    else if (centre.x > xmax) {
        //rect top
        if (centre.y < ymin) {
            return utils.lessOrEq(
                (rect.v2.minus(centre)).magnitude(), circle.rad
            );
        }
        //rect bottom
        else if (centre.y > ymax) {
            return utils.lessOrEq(
                (rect.v3.minus(centre)).magnitude(), circle.rad
            );
        }
        //rect middle (height)
        else {
            return utils.lessOrEq(centre.x - circle.rad, xmax);
        }
    }
    //rect middle (length)
    else {
        //rect top half
        if (centre.y < (ymax + ymin) * 0.5) {
            return utils.greaterOrEq(centre.y + circle.rad, ymin);
        }
        //rect bottom half
        else {
            return utils.lessOrEq(centre.y - circle.rad, ymax);
        }
    }
}

//check if rect1 intersects rect2
export function collisionRectRect(rect1, rect2) {
    /*
    BASIC IDEA:

    1) FIRST: rotate rectangle around so rect1 is horizontal. If rect2 is also
    horizontal/vertical then we can bbox compare and done. OTHERWISE:

    2) IF: a line bbox intersects with a horizontal rectangle,
    THEN: that line will intersect that rectangle
    IFF 2 corners of that rectangle are on different sides of (the infinite 
        extended version of) that line 
    OR  1 corner touches (the infinite extended version of) that line.

    NOTE: We can use y=mx+c to describe the line without worry because the
        only weird cases would be if rectangle is horizontal/vertical (so 2 sides
        would have m infinite), but we removed these cases in the section 1.

    3) AFTER: need to catch the case of rect1 fully inside rect2, ie. no lines 
        from rect2 intersect rect1, yet the rectangle as a whole is inside rect1.
        This is done by checking if opposite sides of rect2 are on opposite sides
        of (the centre of) rect1. 
    (NOTE that if rect2 is fully inside rect1 this will be captured by section 2,
        because the infinite extended lines from rect2 will intersect edges of rect1.
    */

    if(!rect1.bboxCompare(rect2)) {
        return false;
    }
    var angle = rect1.orientation();
    rect1 = rect1.rotate(-angle);
    rect2 = rect2.rotate(-angle);

    //(1) 
    //if rect2 is also horizontal/vertical, just bbox compare
    var rect2Horizontal = utils.floatEq(
        rect2.orientation()/(Math.PI * 0.5) % 1.0,
        0
    );
    if (rect2Horizontal) {
        return rect2.bboxCompare(rect1);
    }

    //(2)
    //define sides of rect as lines with width 0
    var linesRect2 = [
        new Line(rect2.v1, rect2.v2, 0),
        new Line(rect2.v2, rect2.v3, 0),
        new Line(rect2.v3, rect2.v4, 0),
        new Line(rect2.v4, rect2.v1, 0),
    ]
    var pointsRect1 = [
        rect1.v1, rect1.v2, rect1.v3, rect1.v4
    ]
    var centre = rect1.centre();
    var centreComparisons = [];
    for (var line of linesRect2) {
        //get line in form y=mx+c
        //have to do this bit first to prepare for section 3
        var m = (line.y2 - line.y1)/(line.x2 - line.x1);
        var c = line.y1 - m*line.x1;
        centreComparisons.push(centre.y < m*centre.x+c);
        //now bboxcompare the line and the rectangle
        if (!line.bboxCompare(rect1)) {
            continue;
        }
        var result = undefined;
        for (var point of pointsRect1) {
            //check point for y=mx+c
            if (utils.floatEq(point.y, m*point.x+c)) {
                return true;
            }
            //check all points for y<mx+c
            var newResult = point.y < m*point.x + c;
            if (result == undefined) {
                result = newResult;
            }
            //if one point is above line and one is below it, collision
            else if (result != newResult) {
                return true;
            }
        }
    }

    //(3)
    //if each side of rect2 is on opposite side of rect1's centre
    //to the opposing side in rect2, rect1 is inside rect2
    if (centreComparisons[0] != centreComparisons[2] && 
            centreComparisons[1] != centreComparisons[3]){
        return true;
    }

    //if none of above, there is no collision
    return false;

}

//check if rect intersects line
export function collisionRectLine(rect, line) {
    var lineCirc1 = new Circle(line.pos1, line.width/2);
    var lineCirc2 = new Circle(line.pos2, line.width/2);
    var lineRect = new Rect(
        line.centre(), line.length(), line.width, line.orientation()
    )
    if (collisionCircRect(lineCirc1, rect)) {
        return true;
    }
    if (collisionCircRect(lineCirc2, rect)) {
        return true;
    }
    if (collisionRectRect(lineRect, rect)) {
        return true;
    }
    return false;
}

//check if line intersects line
export function collisionLineLine(line1, line2) {
    var line1Circ1 = new Circle(line1.pos1, line1.width/2);
    var line1Circ2 = new Circle(line1.pos2, line1.width/2);
    var line1Rect = new Rect(
        line1.centre(), line1.length(), line1.width, line1.orientation()
    )
    if (collisionCircLine(line1Circ1, line2)) {
        return true;
    }
    if (collisionCircLine(line1Circ2, line2)) {
        return true;
    }
    if (collisionRectLine(line1Rect, line2)) {
        return true;
    }
    return false;
}

//------------------------------------------------------------
//combined collision function
//------------------------------------------------------------

//check if shape1 intersects shape2
export function collision(shape1, shape2) {

    if([constants.COMPOUND_SHAPE, constants.POLYGON].includes(shape1.name)) {
        for(var shape of shape1.shapes) {
            if (collision(shape, shape2)) {
                return true;
            }
        }
        return false;
    }
    if([constants.COMPOUND_SHAPE, constants.POLYGON].includes(shape2.name)) {
        for(var shape of shape2.shapes) {
            if (collision(shape1, shape)) {
                return true;
            }
        }
        return false;
    }

    switch ([shape1.name, shape2.name].join("")) {

        case [constants.CIRCLE, constants.CIRCLE].join(""):
            return collisionCircCirc(shape1, shape2);
            break;

        case [constants.CIRCLE, constants.RECTANGLE].join(""):
            return collisionCircRect(shape1, shape2);
            break;
        case [constants.RECTANGLE, constants.CIRCLE].join(""):
            return collisionCircRect(shape2, shape1);
            break;

        case [constants.CIRCLE, constants.LINE].join(""):
            return collisionCircLine(shape1, shape2);
            break;
        case [constants.LINE, constants.CIRCLE].join(""):
            return collisionCircLine(shape2, shape1);
            break;

        case [constants.RECTANGLE, constants.RECTANGLE].join(""):
            return collisionRectRect(shape1, shape2);
            break;

        case [constants.RECTANGLE, constants.LINE].join(""):
            return collisionRectLine(shape1, shape2);
            break;
        case [constants.LINE, constants.RECTANGLE].join(""):
            return collisionRectLine(shape2, shape1);
            break;

        case [constants.LINE, constants.LINE].join(""):
            return collisionLineLine(shape1, shape2);
            break;

        default:
            throw new Error(
                `collision not implemented for shapes 
                of type [${shape1.name}, ${shape2.name}]`
            )
            break;
    }
}
