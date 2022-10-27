window.onscroll = function () {
  scrollio();
};

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function scrollio() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function openSidebar() {
  var btn = document.getElementById("sidebar-button");
  btn.addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "80px";

    document.getElementById("navbar").style.marginLeft = "23.2px";
    document.getElementById("content").style.marginLeft = "80px";
    document.getElementsByClassName("main-frame")[0].style.marginLeft = "80px";

    openSidebar();
  });
}
openSidebar();

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0px";

  document.getElementById("navbar").style.marginLeft = "0px";
  document.getElementById("content").style.marginLeft = "0px";
  document.getElementsByClassName("main-frame")[0].style.marginLeft = "0px";
}

function game(path) {
  document.getElementsByClassName("main-frame")[0].src = path;
  document.getElementById("navbar").style.height = "0px";
  document.getElementById("navbar").classList.remove("sticky");
  closeSidebar();
}
