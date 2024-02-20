const fs = require("fs");

const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let words = [];

const wordsReadStream = fs.createReadStream(__dirname + "/words.txt");

wordsReadStream.on("data", (chunk) => {
  words = words.concat(chunk.toLocaleString().split(" "));
});

const settings = require("./settings.json");

const classifications = require("./classification.json");

setTimeout(run, 5000);
function run() {
  const word = words[settings.collectorOnWord];
  readline.question(`${word}: `, (input) => {
    if (classifications[input]) {
      classifications[input].push(word);
    } else {
      classifications[input] = [word];
    }

    settings.collectorOnWord++;
    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings));
    fs.writeFile(__dirname + "/classification.json", JSON.stringify(classifications, null, 4), () => {});

    run();
  });
}
