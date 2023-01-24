import {Game} from "../models/Game.model"
import { ITile, ITreasure, IAdventurer, isIAdventurer, isITreasure } from "../services/Parser.service";

export class GameController {

    private _game: Game;

    constructor(instructions: (ITile | ITreasure | IAdventurer)[]) {
        if (instructions.length < 1)
            this._game = new Game(0, 0);
        else {
            let map: ITile = instructions[0] as ITile;
            this._game = new Game(map.x, map.y);
        }
        this.initGame(instructions);
    }

    private initGame(instructions: (ITile | ITreasure | IAdventurer)[]) {
        for (let i = 0; i < instructions.length; i++) {
            let curr = instructions[i];
            if (isIAdventurer(curr)) {
                this._game.setAdventurer(curr.name, curr.x, curr.y, curr.direction, curr.moves);
            } else if (isITreasure(curr)) {
                this._game.setTreasor(curr.x, curr.y, curr.treasureCount);
            } else if (curr.isMontain) {
                this._game.setMontain(curr.x, curr.y);
            }
        }
    }

    public play(): string {
        /*let turn = 0;
        let isGameRunning = this._game.playersHaveMoves();
        do {
            
        } while (isGameRunning)*/
        return this._game.gameToString();
    }
}