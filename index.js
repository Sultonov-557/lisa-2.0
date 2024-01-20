const fs = require("fs");

let data = [];

const readStream = fs.createReadStream(__dirname + "/data.txt");

readStream.on("data", (chunk) => {
  data = data.concat(chunk.toLocaleString().toLocaleLowerCase().split(" "));
});

/**
 * @param {string} input
 * @param {number} words
 */
module.exports["continue"] = (input, words) => {
  let output = "";

  const indexs = [];
  let index;
  while (index != -1) {
    index = data.indexOf(input, index + 1);
    if (index != -1) indexs.push(index);
  }

  index = indexs[Math.floor(Math.random() * indexs.length)];

  for (let i = index; i < index + words; i++) {
    if (data[i]) {
      output += data[i];
    } else {
      break;
    }
    output += " ";
  }
  return output;
};
