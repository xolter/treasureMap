import {assert} from "chai"
import {Game} from "../src/models/Game.model"

let game: Game;

before(async function() {
    game = new Game(3, 4);
    game.setMontain(1, 0);
    game.setMontain(2, 1);
    game.setTreasure(0, 3, 1);
    game.setAdventurer("test", 1, 1, "S", "A");

});

describe('Test Game moves check', function() {
    describe('#isLegalMove()', function() {
        it('go in empty tile', function() {
            assert.isTrue(game['isLegalMove'](1, 2));
        });
        it('go in Montain', function() {
            assert.isFalse(game['isLegalMove'](1, 0));
        });
        it('go out of bound', function() {
            assert.isFalse(game['isLegalMove'](4, 4));
        });
        it('go on Treasure', function() {
            assert.isTrue(game['isLegalMove'](0, 3));
        });
        it('go on Adventurer', function() {
            assert.isFalse(game['isLegalMove'](1, 1));
        });
    }),
    describe('#isTreasure()', function() {
        it('is not a treasure', function() {
            assert.isFalse(game.isTreasure(1, 1));
        });
        it('is a treasure', function() {
            assert.isTrue(game.isTreasure(0, 3));
        });
        it('no treasure left', function() {
            assert.isFalse(game.isTreasure(0, 3));
        });
    }),
    describe('#playersHaveMoves()', function() {
        it('Adventurer has move', function() {
            assert.isTrue(game.playersHaveMoves());
        });
        it('Adventurer has no move', function() {
            game.addRound();
            assert.isFalse(game.playersHaveMoves());
        });
    })
});