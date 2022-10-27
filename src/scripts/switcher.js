if (window.localStorage.getItem("light-theme") === "true") {
  document.body.classList.toggle("light");
  document.getElementById("switch-button").src =
    "./assets/dark_mode_black_24dp.svg";
  document.getElementById("sidebar-button").src =
    "./assets/menu_black_24dp.svg";
  var iframe = document.getElementsByClassName("main-frame")[0];
  iframe.src = iframe.src;
}

function themeSwitcher() {
  document
    .getElementById("switch-button")
    .addEventListener("click", function () {
      document.body.classList.toggle("light");
      if (window.localStorage.getItem("light-theme") === "true") {
        window.localStorage.setItem("light-theme", "false");
        document.getElementById("switch-button").src =
          "./assets/light_mode_white_24dp.svg";
        document.getElementById("sidebar-button").src =
          "./assets/menu_white_24dp.svg";
        var iframe = document.getElementsByClassName("main-frame")[0];
        iframe.src = iframe.src;
      } else {
        window.localStorage.setItem("light-theme", "true");
        document.getElementById("switch-button").src =
          "./assets/dark_mode_black_24dp.svg";
        document.getElementById("sidebar-button").src =
          "./assets/menu_black_24dp.svg";
        var iframe = document.getElementsByClassName("main-frame")[0];
        iframe.src = iframe.src;
      }
    });
}
themeSwitcher();
