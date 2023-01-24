import {assert} from "chai";
import {Parser} from "../src/services/Parser.service";
import { ITile, ITreasure, IAdventurer } from "../src/services/Parser.service";

let badFile: string;
let validFile: string;

before(async function() {
    badFile = await Parser.readFile('');
    validFile = await Parser.readFile('../../tests/assets/testFile1');
});

describe('Test file import', function() {
  it('no file', function() {
    assert.equal(badFile, '');
  });
  it('valid file', function() {
    assert.notEqual(validFile, '');
  });
});

describe('Test check instruction', function() {
  describe('#isValidTileInstruction()', function() {
    it('["A", "0", "0"] --> false', function() {
      assert.equal(Parser.isValidTileInstruction(["A", "0", "0"]), false);
    });
    it('["M", "5", "0"] --> true', function() {
      assert.equal(Parser.isValidTileInstruction(["M", "5", "0"]), true);
    });
  }),
  describe('#isValidTreasorInstruction()', function() {
    it('["T", "0", "0"] --> false', function() {
      assert.equal(Parser.isValidTreasorInstruction(["T", "0", "0"]), false);
    });
    it('["T", "5", "0", "6"] --> true', function() {
      assert.equal(Parser.isValidTreasorInstruction(["T", "5", "0", "6"]), true);
    });
  }),
  describe('#isValidAdventurerInstruction()', function() {
    it('["A", "John", "0", "Doe", "S", "AA"] --> false', function() {
      assert.equal(Parser.isValidAdventurerInstruction(["A", "John", "0", "Doe", "S", "AA"]), false);
    });
    it('["A", "John", "0", "1", "S", "AA"] --> true', function() {
      assert.equal(Parser.isValidAdventurerInstruction(["A", "John", "0", "1", "S", "AA"]), true);
    });
  })
});

describe('Test ParseFile', function() {
  it('only C', function() {
    let expected: ITile[] = [];
    assert.deepEqual(Parser.parseFile("C - 3 - 4"), [expected, [3, 4]]);
  });
  it('C and M', function() {
    let test = Parser.parseFile("C - 3 - 4\nM - 2 - 1");
    let expected: ITile[] = [{isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, [expected, [3, 4]]);
  });
  it('C and M with # line', function() {
    let test = Parser.parseFile("C - 8 - 8\n#Should be ignored\nM - 2 - 1");
    let expected: ITile[] = [{isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, [expected, [8, 8]]);
  });
  it('C and M with random lines', function() {
    let test = Parser.parseFile("C - 9 - 10\nthq^çdfv4\nM - 2 - 1\n\t  - -\nT  -1 - 1 - 2");
    let expected: ITile[] = [{isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, [expected, [9, 10]]);
  });
  it('C, M, T and A', function() {
    let test = Parser.parseFile("C - 3 - 4\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA");
    let expected: (ITile | ITreasure | IAdventurer)[] = [
      {isMontain: true, x: 2, y: 1}, {isMontain: false, x: 0, y: 3, treasureCount: 2},
      {isMontain: false, x: 1, y: 3, treasureCount: 3}, {isMontain: false, name: "Lara", x: 1, y: 1, direction: "S", moves: "AADADAGGA"}
    ];
    assert.deepEqual(test, [expected, [3, 4]]);
  });
});