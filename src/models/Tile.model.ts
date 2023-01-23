export enum FieldType {
    plain = "plain",
    montain = "montain",
    treasor = "treasor"
}

export class Tile {
    protected _x: number;
    protected _y: number;
    protected _isAccessible: boolean;

    constructor(x: number, y: number, fieldType: FieldType) {
        this._x = x;
        this._y = y;
        this._isAccessible = fieldType !== FieldType.montain;
    }

    get isAccessible() {
        return this._isAccessible;
    }

    set isAccessible(isAccessible: boolean) {
        this.isAccessible = isAccessible;
    }
}