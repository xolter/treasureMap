import { Adventurer } from "../models/Adventurer.model";
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
                this._game.setTreasure(curr.x, curr.y, curr.treasureCount);
            } else if (curr.isMontain) {
                this._game.setMontain(curr.x, curr.y);
            }
        }
    }

    public play(): string {
        let isGameRunning = this._game.playersHaveMoves();
        if (this._game.adventurers.length < 1 || !isGameRunning)
            return this._game.gameToString();
        let currAdventurer: Adventurer;
        let nextX: number;
        let nextY: number;
        do {
            for (let i = 0; i < this._game.adventurers.length; i++) {
                currAdventurer = this._game.adventurers[i];
                [nextX, nextY] = currAdventurer.move(this._game.round);
                if (!this._game.isLegalMove(nextX, nextY))
                    continue;
                if (this._game.isTreasure(nextX, nextY))
                    currAdventurer.addTreasure();
                currAdventurer.x = nextX;
                currAdventurer.y = nextY;   
            }
            this._game.addRound();
            isGameRunning = this._game.playersHaveMoves();
        } while (isGameRunning)
        return this._game.gameToString();
    }
}