export function opencart() {
  let overlay = document.getElementById("overlay");
  let widget = document.getElementById("cart");
  widget.style.display = "block";
  overlay.classList.add("animate__headShake");
  overlay.style.display = "block";
  window.setTimeout(function () {
    overlay.style.transform = "translate(opacity .25s)";
  }, 0);
  window.setTimeout(function () {
    widget.style.transform = "translate(-420px)";
  }, 0);
  overlay.addEventListener("click", closecart);
}

export function closecart() {
  let overlay = document.getElementById("overlay");
  let widget = document.getElementById("cart");
  window.setTimeout(function () {
    widget.style.transform = "translate(0px)";
  }, 0);
  overlay.style.display = "none";
}
