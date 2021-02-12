//Rectangle shape class

import {constants} from '../Utils/constants.mjs';
import {BBox} from './bbox.mjs';
import {Line} from './line.mjs';
import {Shape} from './shape.mjs';

export class Polygon extends Shape {

    constructor(vertices, linewidth=10, points) {

        if(points == undefined) {
            var points = {};
            var count = 1;
            for (var vertex of vertices) {
                points[`v${count}`] = vertex;
                count++;
            }
        }
        super(points, {linewidth: linewidth});

        this.vertices = vertices;
        this.linewidth = linewidth;
        this.shapes = this._getLines(vertices, linewidth);

        this.name = constants.POLYGON;
    }

    //update properties after rotation / translation
    update() {
        super.update();
        this.verticies = [];
        for (key in this.points) {
            this.vertices.push(this.points[key]);
        }
        this.shapes = this._getLines(this.verticies);
    }

    //get shape list from vertices
    _getLines(vertices, linewidth) {
        return vertices.reduce(
            function(result, value, index, array) {
                result.push(
                    new Line (
                        array[index % array.length],
                        array[(index + 1) % array.length],
                        linewidth,
                    )
                );
                return result;
            },
            [],
        );
    }

    //return clone of this with points in new position
    clone(points, orientation) {
        var vertices = [];
        for (key in this.points) {
            vertices.push(this.points[key]);
        }
        return new Polygon(vertices, this.linewidth, points);
    }

    //return bbox of this
    bbox() {
        if (this._bbox == undefined) {
            this._bbox =  new BBox(
                Math.min(...this.vertices.map(v => v.x)) - this.linewidth * 0.5,
                Math.min(...this.vertices.map(v => v.y)) - this.linewidth * 0.5,
                Math.max(...this.vertices.map(v => v.x)) + this.linewidth * 0.5,
                Math.max(...this.vertices.map(v => v.y)) + this.linewidth * 0.5,
            );
        }
        return this._bbox;
    }

    //return centre of this
    centre() {
        if(this._centre == undefined) {
            this._centre = this.vertices.reduce(
                (result, value) => result.plus(value),
            ).sMult(1/this.vertices.length);
        }
        return this._centre;
    }

    //draw polygon to ctx
    draw(ctx) {
        for(var shape of this.shapes) {
            shape.draw(ctx);
        }
    }

    //string representation
    string() {
        return (
            `Polygon [
                ${(this.vertices.map(vertex=>vertex.string())).join(", ")}
            ]`
        );
    }

}
