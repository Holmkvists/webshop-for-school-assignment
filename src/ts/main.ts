import { catalog } from "./models/product-catalog";
import { headerFunction } from "./header";
import { opencart } from "./header";
import { closecart } from "./header";

let cart = [];
let displayProducts = catalog.slice(0);
let sort = { key: "price", asc: true };

window.onload = () => {
  print_products();
  headerFunction;
  document.getElementById("close").addEventListener("click", closecart);
  document.getElementById("bag").addEventListener("click", opencart);
};

let container = document.getElementById("product-container");

function print_products() {
  container.innerHTML = "";

  displayProducts.map((item) => {
    let product = `


        <div class="group relative">
            
            <div class="image relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
            <img src="${item.imgURL}" alt="${
      item.model + " " + item.brand
    }" class="product-img w-full h-full object-center object-cover lg:w-full lg:h-full">   
                <div class="overlay"><button data-value="${
                  item.artno
                }" class="view-product">View Product</button></div>

            </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                  ${item.model}
              </h3>
              <p class="mt-1 text-sm text-gray-500">${item.brand}</p>
            </div>
            <div class="flex-col">
            <p class="text-sm font-medium text-gray-900 text-right">$${
              item.price
            }</p>
              <div id="${item.artno}" class="add-state">
                <button class="add-to-cart" data-value="${
                  item.artno
                }">Add</button>
              </div>
            </div>
            </div>
            </div>
      `;
    container.innerHTML += product;
    document.querySelectorAll(".add-to-cart").forEach((item) => {
      item.addEventListener("click", (event) => {
        addToCart(event);
      });
    });
    document.querySelectorAll(".view-product").forEach((item) => {
      item.addEventListener("click", (event) => {
        productdetail(event);
      });
    });
  });
}

function productdetail(event) {
  //När man klickar på en bild, hämta artikelnumret och skicka användaren till den URL:en med ?artno...
  const artno = event.target.getAttribute("data-value");

  //Hämtar elementen container-wrapper och product-container
  let wrapper = document.getElementById("container-wrapper");
  let productContainer = document.getElementById("product-container");

  //Skapar nya divvar och tillskriver nytt innehåll (länk och bild)
  let detailsPage = document.createElement("div");
  detailsPage.innerHTML += `

  <div class="container selected-wrapper"> 
  <div class="container selected-inner">

  <div class="image-wrapper">
  <div class="selected-image">

  <h3 class="text-uppercase h3-heading">adidas Originals
  Stan Smith Vegan</h3>
  <img src="https://www.sneakersnstuff.com/images/269940/product_large.jpg"/>
  </div>

  <!--- Här ska produktbeskrivning ligga --->

  <div class="container item-details">
  <h4 class="item-title">Description</h4>
  <p class="item-description">
  Anticipated by a lot of people, vegan classics, like this adidas Stan Smith as a vegan alternative.
  The iconic retro tennis shoe from adidas is crafted with a recycled polyester upper, using no animal products whatsoever in the creation of the product.</p>

<ul class="list-unstyled detail-list">
<li class="list-item">- Recycled polyester upper</li>
<li class="list-item">- Embossed logo</li>
<li class="list-item">- Rubber outsole</li>
</ul>

  </div>
  </div>

  </div>
  </div> 

  `;

  //Ersätter "productContainer" med den nya divven "detailsPage"
  wrapper.replaceChild(detailsPage, productContainer);

  //Loggar ut artikelnumret - ta bort sen
  console.log(artno);

  /* Det som händer efter användaren har skickats till rätt sida.
/Produktdatan hämtas & presenteras på skärmen*/
}

function addToCart(event) {
  let artno = event.target.getAttribute("data-value");
  let addbtn = event.target;
  let parent = document.getElementById(artno);
  let added = document.createElement("p");
  added.classList.add("added");
  added.innerHTML = "Added <i class='bi bi-check'></i>";
  added.setAttribute("id", artno);
  addbtn.replaceWith(added);
  let item = catalog.find((x) => x.artno === artno);
  cart.push(item);
  document.getElementById("cart-amount").innerHTML = cart.length.toString();
  console.log(cart);
  calculatePrice();
}

function calculatePrice() {
  let totalPrice = document.getElementById("totalPrice");
  let total = 0;

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let price = cart[i].price;
      total = total + price;
    }
  }

  totalPrice.innerHTML = "$" + total.toString();
  printCart();
  return total;
}

function notAdded(artno) {
  let parent = document.getElementById(artno);
  let add = document.createElement("button");
  let added = parent.firstElementChild;
  add.classList.add("add-to-cart");
  add.setAttribute("data-value", artno);
  add.innerHTML = "Add";

  parent.removeChild(added);
  parent.appendChild(add);

  add.addEventListener("click", (event) => {
    addToCart(event);
  });
}

function printCart() {
  let cartWidget = document.getElementById("cart-widget");
  cartWidget.innerHTML = "";
  cart.map((item) => {
    let cartitem = `
    <div class="row mb-4">
    <div class="col-3">
      <img width="100%" src="${item.imgURL}" alt="">
    </div>
    <div class="col-6">
      <p class="my-0">${item.model}</p>
      <p class="my-0">${item.brand}</p>
      <p class="my-0">Size: 7</p>
    </div>
    <div class="col-3 flex flex-col">
      <p>$${item.price}</p>
      <a class="remove-item" data-value="${item.artno}">Remove</a>
    </div>
  </div>
    `;
    cartWidget.innerHTML += cartitem;
    document.querySelectorAll(".remove-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        removeitem(event);
        calculatePrice();
      });
    });
  });
}

function removeitem(event) {
  let artno = event.target.getAttribute("data-value");
  cart = cart.filter((item) => {
    return item.artno != artno;
  });
  document.getElementById("cart-amount").innerHTML = cart.length.toString();
  printCart();
  notAdded(artno);
}

let lowToHigh = document.getElementById("lowToHigh");
lowToHigh.addEventListener("click", sortLowToHigh);

function sortLowToHigh() {
  sortItems("price", true);
  print_products();
}

let highToLow = document.getElementById("highToLow");
highToLow.addEventListener("click", sortHighToLow);

function sortHighToLow() {
  sortItems("price", false);
  print_products();
}

function sortItems(key, asc) {
  sort = { key: key, asc: asc };

  displayProducts.sort(function (a, b) {
    return asc ? a[key] - b[key] : b[key] - a[key];
  });
}

let brandFilters = document.getElementById("brandFilter");
let allProducts = document.getElementById("allProducts");
allProducts.addEventListener("click", function () {
  displayProducts = catalog.slice(0);

  sortItems(sort.key, sort.asc);
  print_products();
});

let blocklist = [];

for (let i = 0; i < catalog.length; i++) {
  let item = catalog[i];

  if (blocklist.indexOf(item.brand) > -1) continue;

  let a = document.createElement("a");

  a.setAttribute("class", "dropdown-item");
  a.setAttribute("href", "javascript:void(0)");
  a.addEventListener("click", filterBrand);
  a.innerText = item.brand;

  brandFilters.appendChild(a);
  blocklist.push(item.brand);
}

function filterBrand() {
  let brand = this.innerText;

  let filtered = catalog.filter(function (property) {
    return property.brand == brand;
  });

  displayProducts = filtered;
  sortItems(sort.key, sort.asc);

  print_products();
}
