import { catalog } from "./models/product-catalog";

let searchbarButton: HTMLButtonElement = document.getElementById(
  "searchbarButton"
) as HTMLButtonElement;
searchbarButton.addEventListener("click", expandSearchbar);

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
