console.clear();

const { readdirSync } = require("fs");
const fs = require("fs");
const express = require("express");
const app = express();

var games = readdirSync("./src/games/", { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);
var num = 0;
var list = ``;

function template(name, banner, authors, num, path) {
  return `${num === 1 ? "" : "\n"}<div id="${num}" class="module">
        <div class="title">
            <h1>${name}</h1>
        </div>
        <div class="banner">
            <img src="${banner}">
        </div>
        <div class="actions">
            <a>
              <button class="play-button" onclick="game('${path}')">PLAY</button>
            </a>
            <p><strong>Author(s):</strong> ${authors}</p>
        </div>
    </div>`;
}
games.forEach((item) => {
  num++;
  var game = require(`./src/games/${item}/info.js`);
  var module = template(game.name, game.banner, game.authors, num, game.path);

  list += module;
});
var code = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>List</title>
    <link rel="stylesheet" href="./styles/styles.css" />
  </head>
  <body>
  <div class="inner">
    ${list}
  </div>

  <script>
  if (window.localStorage.getItem("light-theme") === "true") {
    document.body.classList.toggle("light");
  }
  </script>
  <script>
  function game(path) {
    location.href = path;
    parent.document.getElementById("navbar").style.height = "0px";
    parent.document.getElementById("navbar").classList.remove("sticky");
    closeSidebar();
  }
  </script>
  </body>
</html>`;

fs.writeFile("./src/games.html", code, (err) => {
  console.log(
    err === null ? "(+) Compiled Games" : `(-) Error Compliling Games: ${err}`
  );
});

var as = ``;
var i = 0;
function a(name, href, i) {
  return `${
    i === 1 ? "" : "\n"
  }<a href="javascript:void(0)" onclick="game('${href}')"><p>${name}</p></a>`;
}

games.forEach((item) => {
  i++;
  var game = require(`./src/games/${item}/info.js`);
  var u = a(game.name, game.path, i);

  as += u;
});

var index = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./styles/main.css" rel="stylesheet" />
    <title>Games</title>
  </head>
  <body>
    <nav id="navbar">
      <a><img id="sidebar-button" src="./assets/menu_white_24dp.svg" /></a>
      <a href="./">Home</a>
      <a href="javascript:void(0)" onclick="document.getElementsByClassName('main-frame')[0].src='./about.html';">About</a>
      <a style="float:right;"><img id="switch-button" src="./assets/light_mode_white_24dp.svg"></a>
    </nav>

    <div id="sidebar" class="sidebar">
      <a href="javascript:void(0)" class="closebtn" onclick="closeSidebar()"
        >x</a
      >
      ${as}
    </div>

    <table cellspacing="0" cellpadding="0" id="content">
      <iframe class="main-frame" src="./games.html" frameborder="0"></iframe>
    </table>

    <script src="./scripts/script.js"></script>
    <script src="./scripts/switcher.js"></script>
  </body>
</html>`;

fs.writeFile("./src/index.html", index, (err) => {
  console.log(
    err === null ? "(+) Loaded Sidebar" : `(-) Error Loading Sidebar: ${err}`
  );
});

app.use(express.static("src"));
app.listen(8080, () => {
  console.log("(!) Link: http://localhost:8080\n-----");
});
