const fs = require("fs");
const Qieyun = require("qieyun");

const dictionary =
  fs.readFileSync("words.tsv", "utf8") +
  fs.readFileSync("extra_words.tsv", "utf8");

const map = new Map();

dictionary
  .trimEnd()
  .split("\n")
  .forEach((line) => {
    const [詞, 讀音們] = line.split("\t");
    if (!map.has(讀音們)) map.set(讀音們, new Set([詞]));
    else map.get(讀音們).add(詞);
  });

const arr = [];

map.forEach((詞們, 讀音們) => {
  const 詞們_new = [...詞們].join("/");
  if (詞們_new.length > 5) return;

  const 讀音們_new = 讀音們
    .split(" ")
    .map((描述) => Qieyun.音韻地位.from描述(描述).編碼)
    .join(" ");

  arr.push([讀音們_new, 詞們_new]);
});

arr.sort(([讀音們_a], [讀音們_b]) => {
  if (讀音們_a.split(" ").length !== 讀音們_b.split(" ").length)
    return 讀音們_a.split(" ").length - 讀音們_b.split(" ").length;
  return 讀音們_a > 讀音們_b ? 1 : 讀音們_a < 讀音們_b ? -1 : 0;
});

const result =
  arr.map(([讀音們, 詞們]) => 讀音們 + "\t" + 詞們).join("\n") + "\n";

fs.writeFileSync("assets/data.tsv", result);
