//Level class

import {print, newLine} from './Utils/print.mjs';
import {Base, Vector} from './Utils/index.mjs';
import {Circle, Line} from './Shapes/index.mjs'
import {Character} from './Character/character.mjs';
//import {mouseDown, mouseMove, mouseUp, keyDown, keyUp} from './EventHandlers/index.mjs';

export class Level extends Base {

    // initialise screen attributes on construction
    constructor() {
        super();
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.pos1 = new Vector(0, 0);
        this.pos2 = new Vector(0, 0);
        this.clicked = false;

        this.character = new Character(
            new Circle(new Vector(50, 50), 5),
        );

        var topLeft = new Vector(0, 0);
        var topRight = new Vector(this.width, 0);
        var bottomLeft = new Vector(0, this.height);
        var bottomRight = new Vector(this.width, this.height);
        this.lines = [
            new Line(bottomLeft, bottomRight)
        ];
        this.minLineLength = 20;

        //for now the screen has a coefficient of elasticity - later I'll make
        //this a property of individual lines
        this.coe = 0.3;

        this.drawMode = "DRAW";
    }

    //make event handlers usable by this class
    handler(eventHandler) {
        return event=>eventHandler(event, this);
    }

    // add event listeners to screen
    init() {
        this.canvas.addEventListener("mousedown", this.handler(mouseDown), false);
        this.canvas.addEventListener("mouseup", this.handler(mouseUp), false);
        this.canvas.addEventListener("mousemove", this.handler(mouseMove), false);
        document.addEventListener("keydown", this.handler(keyDown), false);
        document.addEventListener("keyup", this.handler(keyUp), false);
    }

    // game movement
    movement() {
        moveCharacter(this);
    }

    //begin level
    start() {
        this.inProgress = true;
        this.init();
        this.run();
    }

    //end level
    stop() {
        this.inProgress = false;
    }

    // run level with requestAnimationFrame
    run() {
        this.movement();
        this.display();
        if (this.inProgress) {
            requestAnimationFrame(()=>this.run());
        }
    }

    // display level
    display() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.character.display();
    }

}
