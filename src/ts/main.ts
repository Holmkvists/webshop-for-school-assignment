import { catalog } from "./models/product-catalog";
import { headerFunction } from "./header";
import { preventExtensions } from "core-js/core/object";
import { opencart } from "./header";
import { closecart } from "./header";
import { updatePropertyAccessChain } from "typescript";

let cart = [];
let displayProducts = catalog.slice(0);
let sort = { key: "price", asc: true };

window.onload = () => {
  print_products();
  headerFunction;
  getUrl();
  checkAvailability();
  displaySizes();
  clickAddBtn();
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
              <div class="overlay"><a href="${item.artno}" data-value="${
                item.artno
              }" class="view-product">View Product</a></button></div>

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
      productdetails(event); //varje gång man klickar på en produkt, kör funktionen som visar produktdetaljerna
      let item = event.target;
      });
    });
  });
}

//Deklarerar variablerna globalt
let url = window.location.pathname;
const path = /[^/]*$/.exec(url)[0];

//loopar igenom katalogen efter ett artno som är detsamma som path
//& skapar en ny lista baserat på den, som heter product
let product = catalog.filter(product => product.artno === path);  

//Hämtar url, tar värdet efter / och skickar vidare till productdetails
function getUrl() {
 if (!path.length) {
    return; 
  } else if (path.length > 0) {
     //Skickar nya listan product som en parameter i funktionen productdetails
    productdetails(product);
  }
}

//I den nya funktionen, 
function productdetails(event) {

  if (product)
   {
    //Loopar igenom listan
    product.map((item) => {

    console.log(item.artno, item.colors);
      let wrapper = document.getElementById("container-wrapper");
      let productContainer = document.getElementById("product-container");

      let detailsPage = document.createElement("div");
      detailsPage.innerHTML += `
   
     <div class="container selected-wrapper"> 
     <div class="container selected-inner">
   
     <div class="image-wrapper">
     <div class="selected-image">
   
       <section class="container productcard my-3 pt-6">
         <div class="row my-2 mx-1">
           <div class="col-lg-5 col-md-12 col-12">
             <img class="img-fluid w-100" src="${item.imgURL}" alt="${item.model + " " + item.brand}"/>
             
               <div class="small-img-group mb-4">
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${item.imgURL2}" alt="${item.model + " " + item.brand}"/>
                 </div>
 
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${item.imgURL3}" alt="${item.model + " " + item.brand}"/>
                 </div>
               </div>
             </div>
 
 
           <div class="col-lg-6 col-md-12 col-12 mb-3">
           <h6>
           <ul class="product-nav">
           <li><a href="#">Shop</a></li>
           <li><a href="#">${item.sex}</a></li>
           <li><a href="#">${item.brand}</a></li>
           <li><a href="#">${item.model}</a></li>
           </ul>
           </h6>
 
           <h4 class="text-uppercase h4-heading">${item.model}</h3>
             <h6 class="price">Price: $${item.price}</h6>
             <small id="availability" class="form-text text-muted">${item.instock} <script>checkAvailability();</script></small>
           
 
             <label for="sizes" class="sizing">Sizes</label>
             <select class="my-3" name="sizes" id="sizing">
             <script>${item.sizes} displaySizes();</script>
             </select>
             
             <div class="addbtn">
             <button type="button" class="btn btn-dark">Add to cart</button>
             </div>
 
             <h5 class="item-title mt-4">Description</h5>
               <p class="item-description">
               ${item.description}
               </p>
 
             </div>
 
           </div>
 
         </div>
       </section>
 
     </div>
     </div>
   
     </div>
     </div> 
     `
     ;
    //Ersätter "productContainer" med den nya divven "detailsPage"
     wrapper.replaceChild(detailsPage, productContainer);
    });
  }
  }

  function checkAvailability() {
    let stockItem = document.getElementById("availability");

    catalog.map((item) => {
      if (item.instock == true)
      {
        stockItem.innerText = "In stock";
      }
      else {
        stockItem.innerText = "Out of stock";
      }
    });
  }

  function displaySizes() {
  let sizeOption = document.getElementById("sizing");

  product.map((item) => {
    for (let i = 0; i < item.sizes.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = item.sizes[i];
      sizeOption.appendChild(option);
    }
    });
  }


//Vid klick på addBtn knappen så anropas funktionen addFromDetails
function clickAddBtn() {  
let addBtn = document.getElementById("add-btn"); //Hämtar knapp
addBtn.addEventListener("click", addFromDetails); //Funktionen anropas
}

//Hämtar url, tar värdet efter / och skickar vidare till productdetails
//Hämtar informationen från urlen och skickar till varukorgen
function addFromDetails() { 
  catalog.find((item) => {
    product.push(item);
    });
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
