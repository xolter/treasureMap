import { Adventurer } from "./Adventurer.model";
import { FieldType, Tile } from "./Tile.model";
import { Treasure } from "./Treasure.model";

export class Game {
    private _maxX: number;
    private _maxY: number;
    private _round: number;
    private _map: Tile[][];
    private _adventurers: Adventurer[];

    constructor(maxX: number, maxY: number) {
        this._maxX = maxX;
        this._maxY = maxY;
        this._round = 0;
        this._map = this.initMap();
        this._adventurers = [];
    }

    private initMap(): Tile[][] {
        let gameMap: Tile[][] = [];
        for (let i = 0; i < this._maxX; i++) {
            gameMap[i] = [];
            for (let j = 0; j < this._maxY; j++) {
                gameMap[i][j] = new Tile(i, j, FieldType.plain);
            }
        }
        return gameMap;
    }

    get map() {
        return this._map;
    }

    get round() {
        return this._round;
    }

    set round(round: number) {
        this._round = round;
    }

    get adventurers() {
        return this._adventurers;
    }

    public setMontain(x: number, y: number) {
        this._map[x][y].isAccessible = false;
    }
    public setTreasor(x: number, y: number, treasureCount: number) {
        this._map[x][y] = new Treasure(x, y, FieldType.treasure, treasureCount);
    }

    public setAdventurer(name: string, x: number, y: number, direction: string, moves: string) {
        let adventurer = new Adventurer(name, x, y, direction, moves);
        this._adventurers.push(adventurer);
    }

    public playersHaveMoves(): boolean {
        let i = 0;
        let canMove = true;
        while (i < this._adventurers.length && canMove) {
            if (this._adventurers[i].hasMove(this._round))
                canMove = false;
            i++;
        }
        return canMove;
    }

    public gameToString(): string {
        let gameStr = "C - " + this._maxX + " - " + this._maxY + "\n";
        for (let i = 0; i < this._maxX; i++) {
            for (let j = 0; j < this._maxY; j++) {
                let tile = this._map[i][j];
                if (tile instanceof Treasure) {
                    gameStr += "T - " + i + " - " + j + " - " + tile.counter + "\n";
                } else if (!tile.isAccessible) {
                    gameStr += "M - " + i + " - " + j + "\n";
                }
                if (tile instanceof Adventurer) {
                    gameStr += "A - " + tile.name + " - " + i + " - " + j + " - "
                    + tile.direction+ " - " + tile.treasureCount + "\n";
                }
            }
        }
        return gameStr;
    }
}