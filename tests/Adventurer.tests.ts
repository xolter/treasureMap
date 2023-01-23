import {assert} from "chai"
import {Adventurer, Move, Direction} from "../src/models/Adventurer.model"

let adventurer: Adventurer;

before(async function() {
    adventurer = new Adventurer("John", 0, 0, "S", "A");
});

describe('Test Adventurer moves', function() {
    describe('#initMove()', function() {
        it('empty --> No moves', function() {
            assert.deepEqual(adventurer['initMoves'](""), []);
        });
        it('valid pattern', function() {
            assert.deepEqual(adventurer['initMoves']("AAGGDD"), ["A", "A", "G", "G", "D", "D"] as Move[]);
        });
        it('random pattern', function() {
            assert.deepEqual(adventurer['initMoves']("ABCDEFG"), ["A", "D", "G"] as Move[]);
        });
    }),
    describe('#initDirection()', function() {
        it('empty --> South by default', function() {
            assert.deepEqual(adventurer['initDirection'](""), "S" as Direction);
        });
        it('valid pattern', function() {
            assert.deepEqual(adventurer['initDirection']("E"), "E"  as Direction);
        });
        it('random pattern', function() {
            assert.deepEqual(adventurer['initDirection']("ABCD"), "S" as Direction);
        });
    }),
    describe('#changeDirection()', function() {
        it('facing south going left', function() {
            assert.deepEqual(adventurer['changeDirection']("G"), "E" as Direction);
        });
        it('facing south going right', function() {
            assert.deepEqual(adventurer['changeDirection']("D"), "O" as Direction);
        });
        it('facing north going left', function() {
            adventurer.direction = "N";
            assert.deepEqual(adventurer['changeDirection']("G"), "O" as Direction);
        });
        it('facing west going right', function() {
            adventurer.direction = "O";
            assert.deepEqual(adventurer['changeDirection']("D"), "N" as Direction);
        });
    })
});