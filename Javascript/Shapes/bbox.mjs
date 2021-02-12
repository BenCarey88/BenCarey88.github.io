//bbox class

import {print} from '../Utils/print.mjs';
import {Base} from '../Utils/base.mjs';

export class BBox extends Base {
    
    constructor(xmin, ymin, xmax, ymax) {
        super();
        this.xmin = xmin;
        this.ymin = ymin;
        this.xmax = xmax;
        this.ymax = ymax;
    }

    //compare if this == other bbox
    eq(bbox) {
        return (
            this.floatEq(this.xmin, bbox.xmin) &&
            this.floatEq(this.ymin, bbox.ymin) &&
            this.floatEq(this.xmax, bbox.xmax) &&
            this.floatEq(this.ymax, bbox.ymax)
        );
    }

    //check if this intersects other bbox
    intersect(bbox) {
        return (
            this.lessOrEq(
                Math.max(this.xmin, bbox.xmin),
                Math.min(this.xmax, bbox.xmax)
            ) &&
            this.lessOrEq(
                Math.max(this.ymin, bbox.ymin),
                Math.min(this.ymax, bbox.ymax)
            )
        );
    }

    //draw bbox to ctx
    draw(ctx) {
        ctx.fillStyle = "rgba(233, 212, 96, 0.3)";
		ctx.fillRect(
            this.xmin,
            this.ymin, 
            this.xmax - this.xmin,
            this.ymax - this.ymin
        );
    }

    //string representation
    string() {
        return (
            `BBox[(${this.stringify(this.xmin)},${this.stringify(this.ymin)}) 
            to (${this.stringify(this.xmax)},${this.stringify(this.ymax)})]`
        );
    }

}