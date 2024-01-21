const fs = require("fs");

const readStream = fs.createReadStream(__dirname + "/data1.txt");
const writeStream = fs.createWriteStream(__dirname + "/data.txt");

let data = [];
let wordLimit = 1000000;

readStream.on("data", (chunk) => {
	data = data.concat(
		chunk
			.toLocaleString()
			.toLocaleLowerCase()
			.replace(/[^a-z ]/g, "")
			.split(" ")
	);
	data = [...new Set(data)];
	console.log(`${data.length}/${wordLimit}`);
	if (data.length > wordLimit) {
		end();
		process.abort();
	}
});

readStream.on("end", end);

function end() {
	data = data.join(" ");
	writeStream.write(data);
}
