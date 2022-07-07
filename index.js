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

const data_url =
  "https://nk2028-1305783649.file.myqcloud.com/qieyun-examples/tupa.js";

fetch(data_url)
  .then((response) => response.text())
  .then((func_body) => {
    推導方案 = Qieyun.推導方案.建立(
      new Function("音韻地位", "字頭", "選項", func_body)
    );
  });

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
  if (音韻地位.屬於("上聲")) span.classList.add("tone-x");
  else if (音韻地位.屬於("去聲")) span.classList.add("tone-h");
  span.innerText = romanisation;
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

document.body.addEventListener("click", (e) => {
  if (isStopped) startBoard();
  else stopBoard();
  e.preventDefault();
});
