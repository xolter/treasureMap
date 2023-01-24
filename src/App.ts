import { GameController } from "./controllers/Game.controller";
import { Parser } from "./services/Parser.service";

if (process.argv.length < 3) {
    console.log("Please run: node ./src/App.js {filePath}");
} else {
    const filePath: string = process.argv[2];
    Parser.readFile(filePath).then(content => {
        let gameController = new GameController(Parser.parseFile(content));
    });
    //create objects

    //launch the game

    //create the final file
    
    console.log(filePath);
}