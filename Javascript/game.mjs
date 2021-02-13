//Game class

import {print, newLine} from './Utils/print.mjs';
import {Base} from './Utils/index.mjs';
import {Level} from './level.mjs';

export class Game extends Base {

    // initialise screen attributes on construction
    constructor(levels) {
        super();
        this.levels = levels;
        this.currentLevel = 0;
    }

    //start level
    startLevel(number) {
        if (this.levels.length <= number) {
            throw new Error(`Level ${number} does not exist`)
        }
        this.levels[number].start()
    }

}
