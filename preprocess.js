const fs = require("fs");
const Qieyun = require("qieyun");

const dictionary =
  fs.readFileSync("words.tsv", "utf8") +
  fs.readFileSync("extra_words.tsv", "utf8");

const d = new Map();

for (const line of dictionary.trimEnd().split("\n")) {
  const [c, vs] = line.split("\t");
  if (!d.has(vs)) d.set(vs, new Set([c]));
  else d.get(vs).add(c);
}

const a = [];

for (const [vs, cs] of d) {
  const cs_new = [...cs].join("/");
  if (cs_new.length > 5) continue;

  const vs_new = vs
    .split(" ")
    .map((描述) => Qieyun.音韻地位.from描述(描述).編碼)
    .join(" ");

  a.push([vs_new, cs_new]);
}

a.sort(([ma, mb], [na, nb]) => {
  if (ma.split(" ").length !== na.split(" ").length)
    return ma.split(" ").length - na.split(" ").length;
  return ma > na ? 1 : ma < na ? -1 : 0;
});

const result = a.map(([vs, cs]) => vs + "\t" + cs).join("\n") + "\n";

fs.writeFileSync("assets/data.tsv", result);
