import {Game} from "../models/Game.model"
import { ITile, ITreasure, IAdventurer,
    IEndAdventurer, isIAdventurer, isITreasure } from "../services/Parser.service";

export class GameController {

    private _game: Game;

    constructor(instructions: [(ITile | ITreasure | IAdventurer)[], [number, number]]) {
        this._game = new Game(instructions[1][0], instructions[1][1]);
        this.initGame(instructions[0]);
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

    public play() {
        let turn = 0;
        let isGameRunning = this._game.playersHaveMoves();
        do {
            
        } while (isGameRunning)
    }

    get gameToInstructions(): (ITile | ITreasure | IEndAdventurer)[] {
        return [];
    }
}