import { Adventurer } from "./Adventurer.model";
import { FieldType, Tile } from "./Tile.model";

enum Status {
    running = "running",
    over = "over"
}

export interface TileSpec {
    x: number,
    y: number,
    fieldType: FieldType,
    treasorCount?: number
}

export class Game {
    private _maxX: number;
    private _maxY: number;
    private _round: number;
    private _status: Status;
    private _map: Tile[][];
    private _adventurers: Adventurer[];

    constructor(maxX: number, maxY: number) {
        this._maxX = maxX;
        this._maxY = maxY;
        this._status = Status.running;
        this._round = 0;
        this._map = this.initMap();
        this._adventurers = [];
    }

    private initMap(): Tile[][] {
        let gameMap: Tile[][] = [];
        for (let i = 0; i < this._maxX; i++) {
            for (let j = 0; j < this._maxY; j++) {
                gameMap[i][j] = new Tile(i, j, FieldType.plain);
            }
        }
        return gameMap;
    }

    get map() {
        return this._map;
    }

    get gameStatus() {
        return this._status;
    }

    set gameStatus(gameStatus: Status) {
        this._status = gameStatus;
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
}