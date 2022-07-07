let data;

fetch("assets/data.tsv")
  .then((response) => response.text())
  .then((data_) => {
    data = data_
      .trimEnd()
      .split("\n")
      .map((line) => line.split("\t"));
    startBoard();
  });

let 推導方案;

function determineDataURL() {
  const { value } = document.getElementById("推導方案");
  return {
    tupa: "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/tupa.js",
    baxter:
      "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/baxter.js",
    blankego:
      "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/blankego.js",
    kyonh:
      "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/kyonh.js",
    zyepheng:
      "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/zyepheng.js",
    sliark_peengqvim:
      "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/sliark_peengqvim.js",
    ayaka_2021:
      "https://raw.githubusercontent.com/ayaka14732/rime-ayaka-2021/main/build/ayaka_2021.js",
  }[value];
}

function refreshSchema() {
  fetch(determineDataURL())
    .then((response) => response.text())
    .then((func_body) => {
      推導方案 = Qieyun.推導方案.建立(
        new Function("音韻地位", "字頭", "選項", func_body)
      );
    });
}

refreshSchema();

let isStopped = false;
let boardEventId;

function startBoard() {
  boardEventId = setInterval(refreshBoard, 2000);
  isStopped = false;
}

function stopBoard() {
  clearInterval(boardEventId);
  isStopped = true;
}

function createRomanisationElement(k) {
  const span = document.createElement("span");

  const 音韻地位 = Qieyun.音韻地位.from編碼(k);
  const romanisation = 推導方案(音韻地位);
  span.innerText = romanisation;

  if (音韻地位.屬於("上聲")) span.classList.add("tone-x");
  else if (音韻地位.屬於("去聲")) span.classList.add("tone-h");

  return span;
}

function createRomanisationElements(ks) {
  const df = document.createDocumentFragment();
  for (const k of ks.split(" ")) df.appendChild(createRomanisationElement(k));
  return df;
}

function refreshBoard() {
  const dataLen = data.length;
  const idx = Math.floor(Math.random() * dataLen);
  const [ks, v] = data[idx];

  const elemK = document.getElementById("k");
  const elemV = document.getElementById("v");

  elemK.innerHTML = ""; // clear content
  elemK.appendChild(createRomanisationElements(ks));

  elemV.innerText = "";
  setTimeout(() => {
    elemV.innerText = v;
  }, 1400);
}

function handlePause() {
  if (isStopped) startBoard();
  else stopBoard();
}
