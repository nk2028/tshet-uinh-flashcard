let data;

fetch("data_filtered.txt")
  .then((response) => response.text())
  .then((data_) => {
    data = data_
      .trimEnd()
      .split("\n")
      .map((line) => line.split("\t"));
    startBoard();
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
  if (k.slice(-1) === "x") span.classList.add("tone-x");
  else if (k.slice(-1) === "h") span.classList.add("tone-h");
  span.innerText = k;
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
