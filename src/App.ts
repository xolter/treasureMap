import { GameController } from "./controllers/Game.controller";
import { Parser, ITile, ITreasure, IAdventurer } from "./services/Parser.service";
import { join } from 'path';

if (process.argv.length < 4) {
    console.log("Please run: node ./src/App.js {filePath} {fileDestinationPath}");
} else {
    const filePath: string = process.argv[2];
    const destFilePath: string = process.argv[3];
    Parser.readFile(join(__dirname, filePath)).then(content => {
        console.log(content)
        let parsed: (ITile | ITreasure | IAdventurer)[] = Parser.parseFile(content);
        let gameController = new GameController(parsed);
        console.log(parsed);
        Parser.writeFile(destFilePath, gameController.play());
    });
}