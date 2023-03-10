import {assert} from "chai";
import {Parser} from "../src/services/Parser.service";
import { ITile, ITreasure, IAdventurer } from "../src/services/Parser.service";

let validFile: string;

before(async function() {
  validFile = await Parser.readFile('../../tests/assets/testFile');
});

describe('Test file import', function() {
  it('valid file', function() {
    assert.notEqual(validFile, '');
  });
});

describe('Test check instruction', function() {
  describe('#isValidTileInstruction()', function() {
    it('["C", "0", "0"] --> true', function() {
      assert.equal(Parser.isValidTileInstruction(["C", "0", "0"]), true);
    });
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
    let expected: ITile[] = [{isMontain: false, x: 3, y: 4}];
    assert.deepEqual(Parser.parseFile("C - 3 - 4"), expected);
  });
  it('C and M', function() {
    let test = Parser.parseFile("C - 3 - 4\nM - 2 - 1");
    let expected: ITile[] = [{isMontain: false, x: 3, y: 4}, {isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, expected);
  });
  it('C and M with # line', function() {
    let test = Parser.parseFile("C - 8 - 8\n#Should be ignored\nM - 2 - 1");
    let expected: ITile[] = [{isMontain: false, x: 8, y: 8}, {isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, expected);
  });
  it('C and M with random lines', function() {
    let test = Parser.parseFile("C - 9 - 10\nthq^??dfv4\r\nM - 2 - 1\n\t  - -\nT  -1 - 1 - 2");
    let expected: ITile[] = [{isMontain: false, x: 9, y: 10}, {isMontain: true, x: 2, y: 1}];
    assert.deepEqual(test, expected);
  });
  it('C, M, T and A', function() {
    let test = Parser.parseFile("C - 3 - 4\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\nA - Lara - 1 - 1 - S - AADADAGGA");
    let expected: (ITile | ITreasure | IAdventurer)[] = [
      {isMontain: false, x: 3, y: 4}, {isMontain: true, x: 2, y: 1}, {isMontain: false, x: 0, y: 3, treasureCount: 2},
      {isMontain: false, x: 1, y: 3, treasureCount: 3}, {isMontain: false, name: "Lara", x: 1, y: 1, direction: "S", moves: "AADADAGGA"}
    ];
    assert.deepEqual(test, expected);
  });
});