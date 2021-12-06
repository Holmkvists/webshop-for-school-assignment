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

export function closecart(e) {
  e.preventDefault();
  let widget = document.getElementById("cart");
  widget.style.width = "0px";
  widget.style.display = "none";
}

export function opencart(e) {
  e.preventDefault();
  let widget = document.getElementById("cart");
  widget.style.width = "420px";
  widget.style.display = "block";
}
