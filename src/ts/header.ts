export function headerFunction() {
  let searchbarButton: HTMLButtonElement = document.getElementById(
    "searchbarButton"
  ) as HTMLButtonElement;
  searchbarButton.addEventListener("click", expandSearchbar);
  console.log("hello");
  function expandSearchbar() {
    let searchbar: HTMLInputElement = document.getElementById(
      "searchbar"
    ) as HTMLInputElement;

    if (searchbar.style.display === "block") {
      searchbar.style.display = "none";
    } else {
      searchbar.style.display = "block";
    }
  }
}

export function closecart() {
  let overlay = document.getElementById("overlay");
  let widget = document.getElementById("cart");

  widget.style.display = "none";
  widget.style.right = "-420px";
  overlay.style.display = "none";
}

export function opencart() {
  let overlay = document.getElementById("overlay");
  let widget = document.getElementById("cart");
  widget.style.display = "block";
  overlay.style.display = "block";
  window.setTimeout(function () {
    widget.style.transform = "translate(-420px)";
  }, 0);
  overlay.addEventListener("click", closecart);
}
