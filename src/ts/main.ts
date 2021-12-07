import { catalog } from "./models/product-catalog";
import { headerFunction } from "./header";
import { preventExtensions } from "core-js/core/object";
import { opencart } from "./header";
import { closecart } from "./header";

let cart = [];

window.onload = () => {
  print_products();
  headerFunction;
  document.getElementById("close").addEventListener("click", closecart);
  document.getElementById("bag").addEventListener("click", opencart);
};

function print_products() {
  catalog.map((item) => {
    let container = document.getElementById("product-container");
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

        //"Popstate" letar efter förändringar i url:en
        window.addEventListener('popstate', function(e) {
        productdetail(event);
        });

      });
    });
  });
}


function productdetail(event) {
  //Hämtar elementen container-wrapper och product-container
  let wrapper = document.getElementById("container-wrapper");
  let productContainer = document.getElementById("product-container");

  //Hämtar artikelnumret för den valda produkten
  const artno = event.target.getAttribute("data-value");


catalog.filter((item) => {
//Kontrollerar om artikelnumret i katalogen är samma som artikelnumret i elementet vi klickat på
 for (var i in catalog) {
  if (catalog[i].artno == artno) {

     //Skapar nya divvar och tillskriver nytt innehåll (länk och bild)
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
                 <div class="small-img-col">
                   <img class="small-img" width="100%" src="${item.imgURL2}" alt="${item.model + " " + item.brand}"/>
                 </div>
 
                 <div class="small-img-col">
                   <img class="small-img" width="100%" src="${item.imgURL3}" alt="${item.model + " " + item.brand}"/>
                 </div>
               </div>
             </div>
 
 
           <div class="col-lg-6 col-md-12 col-12">
           <h6>
           <ul class="product-nav">
           <li><a href="#">Shop</a></li>
           <li><a href="#">${item.sex}</a></li>
           <li><a href="#">${item.brand}</a></li>
           <li><a href="#">${item.model}</a></li>
           </ul>
           </h6>
 
           <h4 class="text-uppercase h4-heading">${item.model}</h3>
             <h6 class="price">Price: ${item.price}</h6>
             <small id="reviews" class="form-text text-muted">${item.instock}</small>
           
 
             <label for="sizes" class="sizing">${item.sizes}</label>
             <select class="my-3" name="sizes" id="sizing">
               <option value="1">${item.sizes[0]}</option>
               <option value="2">${item.sizes[1]}</option>
               <option value="3">${item.sizes[2]}</option>
               <option value="4">${item.sizes[3]}</option>
               <option value="4">${item.sizes[4]}</option>
               <option value="4">${item.sizes[5]}</option>
               <option value="4">${item.sizes[6]}</option>
             </select>
             
             <div class="add-btn">
             <button type="button" class="btn btn-dark">Add to cart</button>
             </div>
 
             <h5 class="item-title mt-4">Description</h5>
               <p class="item-description">
               ${item.description}
               </p>
 
               <h5 class="item-title">Materials</h5>
               <p class="materials">
               Empty for now!
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
  }
}

    console.log(catalog[i].artno);

  //Annars... gör det här
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

let totalPrice = document.getElementById("totalPrice");

function calculatePrice() {
  let total = 0;

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let price = cart[i].price;
      console.log(price);
      total = total + price;
      console.log(total);
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