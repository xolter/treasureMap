import {Game} from "../models/Game.model"

export class GameController {
    private game: Game;
    constructor() {
        this.game = new Game(4, 4);
    }
}