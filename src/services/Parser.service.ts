import { promises as fsPromises } from 'fs';

export interface ITile {
  isMontain: boolean;
  x: number;
  y: number;
}

export interface ITreasure extends ITile {
  treasureCount: number;
}

export interface IAdventurer extends ITile {
  name: string;
  direction: string;
  moves: string;
}

export function isITreasure(tile: any): tile is ITreasure {
  return 'treasureCount' in tile;
}

export function isIAdventurer(tile: any): tile is IAdventurer {
  return 'name' in tile;
}

export class Parser {
  static async readFile(filename: string) {
    try {
      const result = await fsPromises.readFile(
        filename,
        'utf-8',
      );
      return result;
    } catch (err) {
      return String(err);
    }
  }

  static async writeFile(filePath: string, content: string) {
    try {
      await fsPromises.writeFile(filePath, content);
      return 0;
    }
    catch (err) {
      console.log(err);
      return 1;
    }
  }

  static isValidTileInstruction(instruction: string[]): boolean {
    if (instruction.length !== 3)
      return false;
    let isValid = true;
    if (instruction[0] === "C" || instruction[0] === "M") {
      isValid = !isNaN(Number(instruction[1])) && !isNaN(Number(instruction[2]));
      return isValid;
    }
    return false;
  }

  static isValidTreasorInstruction(instruction: string[]): boolean {
    if (instruction.length !== 4)
      return false;
    if (instruction[0] !== "T") 
      return false;
    return !isNaN(Number(instruction[1])) && !isNaN(Number(instruction[2])) && !isNaN(Number(instruction[3]));
  }

  static isValidAdventurerInstruction(instruction: string[]): boolean {
    if (instruction.length !== 6)
    return false;
    if (instruction[0] !== "A") 
      return false;
    return !isNaN(Number(instruction[2])) && !isNaN(Number(instruction[3]));  
  }

  static parseFile(fileContent: string): (ITile | ITreasure | IAdventurer)[] {
    let lines = fileContent.split(/\r?\n/);
    let instructions: (ITile | ITreasure | IAdventurer)[] = [];
    for (let i = 0; i < lines.length; i++) {
      let instruction = lines[i].split(" - ");
      if (instruction.length < 3) {
        continue;
      }
      switch (instruction[0]) {
        case "C":
          if (this.isValidTileInstruction(instruction))
            instructions.unshift({
              isMontain: false,
              x: Number(instruction[1]),
              y: Number(instruction[2])
          });
          break;
        case "M":
          if (this.isValidTileInstruction(instruction))
            instructions.push({
              isMontain: true,
              x: Number(instruction[1]),
              y: Number(instruction[2])
          });
          break;
        case "T":
          if (this.isValidTreasorInstruction(instruction))
            instructions.push({
              isMontain: false,
              x: Number(instruction[1]),
              y: Number(instruction[2]),
              treasureCount: Number(instruction[3])
            });
          break;
        case "A":
          if (this.isValidAdventurerInstruction(instruction))
            instructions.push({
              isMontain: false,
              name: instruction[1],
              x: Number(instruction[2]),
              y: Number(instruction[3]),
              direction: instruction[4],
              moves: instruction[5]
            });
          break;
        default:
          break;
      }
    }
    return instructions;
  }
}