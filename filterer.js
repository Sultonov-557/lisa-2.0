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

const writeStream = fs.createWriteStream(__dirname + "/filtered.txt");

const settings = require("./settings.json");

setTimeout(run, 5000);
function run() {
  const word = words[settings.filterOnWord];
  readline.question(`${word}: `, (input) => {
    if (input == "y") {
      writeStream.write(word + " ");
    }

    settings.filterOnWord++;
    fs.writeFileSync(__dirname + "/settings.json", JSON.stringify(settings));

    run();
  });
}
