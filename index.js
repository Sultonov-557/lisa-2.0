const fs = require("fs");

let words = [];

const wordsReadStream = fs.createReadStream(__dirname + "/words.txt");

wordsReadStream.on("data", (chunk) => {
  words = [...new Set(words)];
  words = words.concat(
    chunk
      .toLocaleString()
      .toLocaleLowerCase()
      .replace(/^[^a-zA-Z]*$/g, "")
      .split(" ")
  );
});


/**
 * @param {string} input
 * @returns
 */
module.exports["correct"] = (input, similarity_) => {
  input = input.toLocaleLowerCase();

  let correct = "";

  if (input.includes(" ")) return "speace not allowed";
  if (words.includes(input)) correct = input;

  let words = words.filter((v) => {
    let similar = similarity(input, v);
    return similar > similarity_;
  });

  words = words.sort((a, b) => similarity(input, b) - similarity(input, a));

  return { words, data: words.length };
};

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
