const lisa = require("./index");

const readline = require("node:readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

run();
function run() {
	readline.question(`You: `, (input) => {
		const inputs = input.split(" ");
		let answer = "";
		for (let input of inputs) {
			const output = lisa.correct(input, 0.75);
			answer += output.words[0] + " ";
		}

		console.log(answer);
		run();
	});
}
