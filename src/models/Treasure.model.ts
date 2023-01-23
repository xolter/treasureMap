import { FieldType } from "./Tile.model";
import { Tile } from "./Tile.model";

export class Treasure extends Tile {
    private _counter: number;

    constructor(x: number, y: number, fieldType: FieldType, counter: number) {
        super(x, y, fieldType);
        this._counter = counter;
    }

    get counter() {
        return this._counter;
    }

    public retrieveTreasor(): number {
        if (this._counter > 0) {
            this._counter--;
            return 1;
        } else {
            return 0;
        }
    }
}