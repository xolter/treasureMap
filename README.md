# treasureMap

node v18.13.0
typescript ^4.9.4

tests are made using mocha/chai

==========

Run in 2 steps:
 - npm start
 - node ./src/App.js {filePath} {fileDestinationPath}

(example: $ node ./src/App.js ../tests/assets/testFile1 ./tests/assets/testFileResult)

Run tests: npm run test
Clean compiled files: npm run clean

==========

The code start with App.ts:
- Read the file using the Parse object (in the services folder)
- Create objects (from the models folder)
- Use controller to handle all the interactions between objects
- call the gameToString function, then write the content in a file