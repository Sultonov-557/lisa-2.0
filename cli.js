const lisa = require("./index");

const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

ask();
function ask() {
  readline.question(`You: `, (input) => {
    const output = lisa.continue(input, 10);
    console.log("Lisa:", output);
    ask();
  });
}
