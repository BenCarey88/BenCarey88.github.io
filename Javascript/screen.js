//Screen class containing game global states

import {print, newLine} from './Utils/print.mjs';
import {Vector, Line} from './Utils/index.mjs';
import {Character} from './GameClasses/index.mjs';
import {moveCharacter} from './Movement/index.mjs';
import {mouseDown, mouseMove, mouseUp, keyDown, keyUp} from './EventHandlers/index.mjs';
import {paintLines, displayCharacter} from './Display/index.mjs';


export class Screen {

    // initialise screen attributes on construction
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.pos1 = new Vector(0, 0);
        this.pos2 = new Vector(0, 0);
        this.clicked = false;
        
        this.character = new Character(50, 50);

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

    // display game
    display() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        displayCharacter(this);
        paintLines(this);
    }

    // run game with requestAnimationFrame
    run() {
        this.movement();
        this.display();
	    requestAnimationFrame(()=>this.run());
    }

}