const lisa = require("./index");

const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

run();
function run() {
  readline.question(`You: `, (input) => {
    const output = lisa.correct(input);
    console.log("Lisa:", output);
    run();
  });
}
