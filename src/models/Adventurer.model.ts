export type Direction = "N" | "S" | "E" | "O";
export type Move = "A" | "G" | "D";

export class Adventurer {
    
    private _name: string;
    private _x: number;
    private _y: number;
    private _treasureCount: number;
    private _direction: Direction;
    private _moves: Move[];

    constructor(name: string, x: number, y: number, direction: string, moves: string) {
        this._name = name;
        this._x = x;
        this._y = y;
        this._treasureCount = 0;
        this._direction = this.initDirection(direction);
        this._moves = this.initMoves(moves);
    }

    private isMove(move: string): move is Move {
        switch (move) {
            case "A":
            case "G":
            case "D":
                return true;
            default:
                return false;
        }
    }

    private initMoves(moves: string): Move[] {
        return moves.split('').filter(move => {
            return this.isMove(move);
        }) as Move[];
    }

    private initDirection(direction: string): Direction {
        switch (direction) {
            case "N":
                return "N";
            case "S":
                return "S";
            case "O":
                return "O";
            case "E":
                return "E";
            default:
                return "S";
        }
    }

    private changeDirection(move: Omit<Move, "A">): Direction {
        let directions: Direction[] = ["N", "E", "S", "O"];
        let i = directions.findIndex(e => e === this._direction);
        if (move === "D") {
            return i + 1 === directions.length ? directions[0] as Direction : directions[i + 1] as Direction;
        } else {
            return i - 1 < 0 ? directions[directions.length - 1] as Direction : directions[i - 1] as Direction;
        }
    }

    private goForward(): [number, number] {
        switch (this._direction) {
            case "N":
                return [this._x, this._y - 1];
            case "S":
                return [this._x, this._y + 1];
            case "O":
                return [this._x - 1, this._y];
            case "E":
                return [this._x + 1, this._y];
        }

    }

    public move(round: number): [number, number] {
        if (round < 0 || round >= this._moves.length)
            return [-1, -1];
        let move = this._moves[round];
        switch (move) {
            case "G":
            case "D":
                this._direction = this.changeDirection(move);
                break;
            default:
                break;
        }
        return this.goForward();
    }

    get direction() {
        return this._direction;
    }
    set direction(direction: Direction) {
        this._direction = direction;
    }

    get treasureCount() {
        return this._treasureCount;
    }

    get name() {
        return this._name;
    }

    public addTreasure() {
        this._treasureCount++;
    }

    public hasMove(round: number): boolean {
        return round >= 0 && round < this._moves.length;
    }

    get x() { return this._x; }
    set x(x: number) { this._x = x; }
    get y() { return this._y; }
    set y(y: number) { this._y = y; }
}