import { catalog } from "./models/product-catalog";
import { opencart } from "./header";
import { closecart } from "./header";
import { fromLocalStorage } from "./localStorage";
import { toLocalstorage } from "./localStorage";
import { calculatePrice } from "./calcPrice";

let cart = [];
let displayProducts = catalog.slice(0);
let sort = { key: "property", asc: true };
let selectedBrandsFilters = [];
let selectedColorsFilters = [];
let selectedCategoriesFilters = [];
let cartAmount = document.getElementById("cart-amount");
let container = document.getElementById("product-container");

window.onload = () => {
  if (fromLocalStorage("cart")) {
    cart = fromLocalStorage("cart");
    cartAmount.innerHTML = "" + cart.length;
    printCart(fromLocalStorage("cart"));
  }
  print_products(catalog);
  document
    .getElementById("searchbarContainer")
    .addEventListener("keyup", searchProducts);
  filterOptions();
  document.getElementById("close").addEventListener("click", closecart);
  document.getElementById("bag").addEventListener("click", opencart);
  document.getElementById("lowToHigh").addEventListener("click", sortLowToHigh);
  document.getElementById("highToLow").addEventListener("click", sortHighToLow);
  document.getElementById("brandsAZ").addEventListener("click", sortBrandsAZ);
  document.getElementById("brandsZA").addEventListener("click", sortBrandsZA);
  document.getElementById("modelsAZ").addEventListener("click", sortModelsAZ);
  document.getElementById("modelsZA").addEventListener("click", sortModelsZA);
  document.getElementById("allProducts").addEventListener("click", resetFilter);
};

function print_products(ProductsObjects) {
  container.innerHTML = "";

  ProductsObjects.map((item) => {
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
        event.preventDefault();
        let artno = (event.target as HTMLTextAreaElement).getAttribute(
          "data-value"
        );
        productdetails(artno);
      });
    });
  });
}

function productdetails(artno) {
  let url = window.location.pathname;
  let path = /[^/]*$/.exec(url)[0];

  let product = catalog.filter((product) => product.artno === artno);
  if (product) {
    product.map((item) => {
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
             <img class="img-fluid w-100" src="${item.imgURL}" alt="${
        item.model + " " + item.brand
      }"/>
             
               <div class="small-img-group mb-4">
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${
                     item.imgURL2
                   }" alt="${item.model + " " + item.brand}"/>
                 </div>
 
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${
                     item.imgURL3
                   }" alt="${item.model + " " + item.brand}"/>
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

           <div class="container title-container">
            <h4 class="modelname">${item.model}</h3>
            <h6 class="price">Price: $${item.price}</h6>
            </div>
 
            <div class="container description-container">
             <h5 class="item-title mt-1">Description</h5>
               <p class="item-description mb-5">
               ${item.description}
               </p>
            </div>
 
               <div class="row addSneaker mx-auto">
               <button type="button" class="btn btn-dark addSneakerBtn add-to-cart" data-value="${
                 item.artno
               }">Add to cart</button>
               </div>
             </div>
 
           </div>
 
         </div>
       </section>
 
     </div>
     </div>
   
     </div>
     </div> 
     `;
      wrapper.replaceChild(detailsPage, productContainer);
      document.querySelectorAll(".addSneakerBtn").forEach((item) => {
        item.addEventListener("click", (event) => {
          addToCart(event);
        });
      });
      event.preventDefault();
    });
  }
}

function addToCart(event) {
  let artno = event.target.getAttribute("data-value");
  let addbtn = event.target;
  let added = document.createElement("p");
  added.classList.add("added");
  added.classList.add("add-to-cart");
  added.innerHTML = "Added <i class='bi bi-check'></i>";
  added.setAttribute("id", artno);
  addbtn.replaceWith(added);
  let item = catalog.find((x) => x.artno === artno);
  let itemIndex = cart.length;
  if (!containsObject(item, cart)) {
    cart.push(item);
    console.log(cart);
    cart[itemIndex]["quantity"] = 1;
  } else {
    cart[itemIndex]["quantity"] = cart[itemIndex]["quantity"] + 1;
  }

  toLocalstorage(cart, "cart");
  cart.reduce((total, obj) => obj.quantity + total, 0);

  cartAmount.innerHTML = itemsInCart(cart);

  document.getElementById("bag").classList.add("animate__headShake");
  setTimeout(function () {
    document.getElementById("bag").classList.remove("animate__headShake");
  }, 800);
  calculatePrice(cart);
  printCart(cart);
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

function getSneakerFromDetails(event) {
  let articlenumber = event.target.getAttribute("data-no");
  let clickedBtn = event.target;
  let newItem = catalog.find((sneaker) => sneaker.artno === articlenumber);
  let itemIndex = cart.length;

  if (newItem && !containsObject(newItem, cart)) {
    cart.push(newItem);
    cart[itemIndex]["quantity"] = 1;
  } else {
    cart[itemIndex]["quantity"] = cart[itemIndex]["quantity"] + 1;
  }
  toLocalstorage(cart, "cart");
  cart.reduce((total, obj) => obj.quantity + total, 0);

  cartAmount.innerHTML = itemsInCart(cart);
  document.getElementById("bag").classList.add("animate__headShake");
  setTimeout(function () {
    document.getElementById("bag").classList.remove("animate__headShake");
  }, 800);
  calculatePrice(cart);
}

function printCart(cart) {
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
      <p class="text-center">$${item.price}</p>
      <a class="remove-item" data-value="${item.artno}">Remove</a>
    <div>
    <div class="quantity-field" >
    <button 
    data-value="${item.artno}"
      class="value-button decrease-button" 
      title="Azalt">-</button>
      <div class="number">${item.quantity}</div>
    <button 
      data-value="${item.artno}"
      class="value-button increase-button" 
      title="Arrtır"
    >+
    </button>
  </div>
  </div>
    </div>
  </div>
    `;
    cartWidget.innerHTML += cartitem;
    document.querySelectorAll(".remove-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        removeitem(event);
      });
    });
    document.querySelectorAll(".decrease-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        decreaseItem(event);
      });
    });
    document.querySelectorAll(".increase-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        increaseItem(event);
      });
    });
    document.getElementById("totalPrice").innerHTML =
      "$" + calculatePrice(cart);
  });
}

function removeitem(event) {
  let artno = event.target.getAttribute("data-value");
  cart = cart.filter((item) => {
    return item.artno != artno;
  });

  cartAmount.innerHTML = itemsInCart(cart);

  toLocalstorage(cart, "cart");
  calculatePrice(cart);
  printCart(cart);
  notAdded(artno);
}

// Sort functions

function sortLowToHigh() {
  sortItems("price", true);
  print_products(displayProducts);
}

function sortHighToLow() {
  sortItems("price", false);
  print_products(displayProducts);
}

function sortBrandsAZ() {
  sortItems("brand", true);
  print_products(displayProducts);
}

function sortBrandsZA() {
  sortItems("brand", false);
  print_products(displayProducts);
}

function sortModelsAZ() {
  sortItems("model", true);
  print_products(displayProducts);
}

function sortModelsZA() {
  sortItems("model", false);
  print_products(displayProducts);
}

function sortItems(key, asc) {
  sort = { key: key, asc: asc };

  let compareItemFunction = function (a, b) {
    switch (typeof a[key]) {
      case "number":
        return asc ? a[key] - b[key] : b[key] - a[key];
      case "string":
        let propertyA = (a[key] as string).toUpperCase();
        let propertyB = (b[key] as string).toUpperCase();
        let result = propertyA < propertyB ? -1 : propertyA > propertyB ? 1 : 0;
        return asc ? result : result * -1;
    }
  };
  displayProducts.sort(compareItemFunction);
}

// Filter functions

function filterOptions() {
  let brandsFilters: HTMLDivElement = document.getElementById(
    "brandsFilter"
  ) as HTMLDivElement;
  let uniqueBrands = getUniqueValues(catalog, (m) => m.brand);

  for (let i = 0; i < uniqueBrands.length; i++) {
    let brandName: string = uniqueBrands[i];
    let brandsTag = createFilterOption(brandName);
    brandsTag.addEventListener("click", selectBrand);
    brandsFilters.appendChild(brandsTag);
  }

  let colorFilters: HTMLDivElement = document.getElementById(
    "colorsFilter"
  ) as HTMLDivElement;
  let uniqueColors = getUniqueValues(catalog, (m) => m.colors);

  for (let i = 0; i < uniqueColors.length; i++) {
    let colorName: string = uniqueColors[i];
    let colorTag = createFilterOption(colorName);
    colorTag.addEventListener("click", selectColor);
    colorFilters.appendChild(colorTag);
  }

  let categoriesFilters: HTMLDivElement = document.getElementById(
    "categoriesFilter"
  ) as HTMLDivElement;
  let uniqueCategories = getUniqueValues(catalog, (m) => m.sex);

  for (let i = 0; i < uniqueCategories.length; i++) {
    let categoryName: string = uniqueCategories[i];
    let categoryTag = createFilterOption(categoryName);
    categoryTag.addEventListener("click", selectCategory);
    categoriesFilters.appendChild(categoryTag);
  }
}

function getUniqueValues(arrayOfItems, propertyAccessorCallback) {
  let unique = [];

  for (let i = 0; i < arrayOfItems.length; i++) {
    let value = propertyAccessorCallback(arrayOfItems[i]);
    if (unique.indexOf(value) < 0) {
      unique.push(value);
    }
  }
  return unique;
}

function createFilterOption(str: string) {
  let anchorTag = document.createElement("a");
  anchorTag.setAttribute("class", "dropdown-item");
  anchorTag.setAttribute("href", "javascript:void(0)");
  anchorTag.innerText = str;
  return anchorTag;
}

function selectBrand() {
  let brandOption = this.innerText;
  let selected = !(this.dataset["selected"] == "true");

  if (selected) {
    selectedBrandsFilters.push(brandOption);
  } else {
    let index = selectedBrandsFilters.indexOf(brandOption);
    if (index >= 0) selectedBrandsFilters.splice(index, 1);
  }

  this.dataset["selected"] = selected;

  let filtered = catalog.filter(applyFilter);
  displayProducts = filtered;

  sortItems(sort.key, sort.asc);
  print_products(displayProducts);
  return false;
}

function selectColor() {
  let colorOption = this.innerText;
  let selected = !(this.dataset["selected"] == "true");

  if (selected) {
    selectedColorsFilters.push(colorOption);
  } else {
    let index = selectedColorsFilters.indexOf(colorOption);
    if (index >= 0) selectedColorsFilters.splice(index, 1);
  }
  this.dataset["selected"] = selected;

  let filtered = catalog.filter(applyFilter);
  displayProducts = filtered;

  sortItems(sort.key, sort.asc);
  print_products(displayProducts);
  return false;
}

function selectCategory() {
  let categoryOption = this.innerText;
  let selected = !(this.dataset["selected"] == "true");

  if (selected) {
    selectedCategoriesFilters.push(categoryOption);
  } else {
    let index = selectedCategoriesFilters.indexOf(categoryOption);
    if (index >= 0) selectedCategoriesFilters.splice(index, 1);
  }
  this.dataset["selected"] = selected;

  let filtered = catalog.filter(applyFilter);
  displayProducts = filtered;

  sortItems(sort.key, sort.asc);
  print_products(displayProducts);
  return false;
}

function applyFilter(catalogItem) {
  let isBrandMatch =
    selectedBrandsFilters.length > 0
      ? selectedBrandsFilters.indexOf(catalogItem.brand) >= 0
      : true;

  let isColorMatch =
    selectedColorsFilters.length > 0
      ? selectedColorsFilters.indexOf(catalogItem.colors) >= 0
      : true;

  let isCategoryMatch =
    selectedCategoriesFilters.length > 0
      ? selectedCategoriesFilters.indexOf(catalogItem.sex) >= 0
      : true;

  return isBrandMatch && isColorMatch && isCategoryMatch;
}

function resetFilter() {
  displayProducts = catalog.slice(0);

  document
    .querySelectorAll(".dropdown-item")
    .forEach((b) => b.removeAttribute("data-selected"));

  selectedBrandsFilters.length = 0;
  selectedColorsFilters.length = 0;
  selectedCategoriesFilters.length = 0;
  sortItems(sort.key, sort.asc);
  print_products(displayProducts);
}

// SEARCH FEATURE

function searchProducts(e) {
  let searchFrase = "";
  searchFrase = e.target.value;
  searchFrase = searchFrase.toLowerCase();
  let filteredProducts = catalog.filter((item) => {
    return (
      (item.model.toLowerCase() as any).includes(searchFrase) ||
      (item.brand.toLowerCase() as any).includes(searchFrase)
    );
  });
  if (filteredProducts.length > 0) {
    print_products(filteredProducts);
  } else {
  }
}

// Quantity
function increaseItem(e) {
  const artno = e.target.getAttribute("data-value");
  let itemIndex = cart.findIndex((x) => x.artno === artno);

  cart[itemIndex].quantity = cart[itemIndex].quantity + 1;
  cartAmount.innerHTML = itemsInCart(cart);

  calculatePrice(cart);
  printCart(cart);
  toLocalstorage(cart, "cart");
}

function decreaseItem(e) {
  const artno = e.target.getAttribute("data-value");
  let itemIndex = cart.findIndex((x) => x.artno === artno);
  cart[itemIndex].quantity = cart[itemIndex].quantity - 1;

  if (cart[itemIndex].quantity === 0) {
    removeitem(e);
  }

  cartAmount.innerHTML = itemsInCart(cart);
  calculatePrice(cart);
  printCart(cart);
  toLocalstorage(cart, "cart");
}

function itemsInCart(cart) {
  return cart.reduce((total, obj) => obj.quantity + total, 0).toString();
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}
