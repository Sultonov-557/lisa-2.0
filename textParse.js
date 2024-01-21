const fs = require("fs");

const readStream = fs.createReadStream(__dirname + "/data1.txt");
const writeStream = fs.createWriteStream(__dirname + "/data.txt");

readStream.on("data", (chunk) => {
  chunk = chunk
    .toLocaleString()
    .toLocaleLowerCase()
    .replace(/[^a-z ]/g, "")
    .split(" ");
  chunk = [...new Set(chunk)];
  chunk = chunk.join(" ");
  writeStream.write(chunk);
});
