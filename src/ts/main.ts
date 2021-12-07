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
        window.location.href = "productdetails.html";
        productdetail(event);
        event.preventDefault();
         controllingValue();
      });
    });
  });
}

 //Funktion som filtrerar ut den produkten man har klickat på och skriver ut i html
 //Alt funktion som kontrollerar om värdet (typ en datavalue) finns med i objektet man klickat på. 
 // MEN hur vet vi om det finns ett datavalue om html:en är dynamisk - dvs det skrivs bara ut i js?

 //Kontrollera vilket data-value, skapa funktion som filtrerar ut det data-value vars element vi klickat på.
 //Skriv ut på skärmen. Krävs att alla värden kontrolleras?

 //return this $item..artno t.ex


function controllingValue() {
  catalog.filter((item) => {
  
    //Efter klick - hämta elementets dataset
    
    //Gör en filter, includes, indexof osv
    //returnera värdet & skriv ut på skärmen

    if(/*produkt man har klickat på == har det här värdet */ 0 < 10) {
        //return...
        //modell, artno osv
        //kör funktionen som skriver ut datan
        //
        //else.. annars..
    }
  });


function productdetail(event) {
  //Hämtar artikelnumret för den valda produkten
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
  

      <section class="container productcard my-3 pt-6">
        <div class="row my-2 mx-1">
          <div class="col-lg-5 col-md-12 col-12">
            <img class="img-fluid w-100" src="https://www.sneakersnstuff.com/images/314976/product_medium.jpg" alt="sneaker"/>
            
              <div class="small-img-group mb-4">
                <div class="small-img-col">
                  <img class="small-img" width="100%" src="https://www.sneakersnstuff.com/images/314977/da8291-001-2.jpg" alt="sneaker"/>
                </div>

                <div class="small-img-col">
                  <img class="small-img" width="100%" src="https://www.sneakersnstuff.com/images/314975/da8291-001-1.jpg" alt="sneaker"/>
                </div>
              </div>
            </div>


          <div class="col-lg-6 col-md-12 col-12">
          <h6>
          <ul class="product-nav">
          <li><a href="#">Shop</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Nike</a></li>
          <li><a href="#">Wmns Waffle Trainer 2</a></li>
          </ul>
          </h6>

          <h4 class="text-uppercase h4-heading">adidas Originals
            Stan Smith Vegan</h3>
            <h6 class="price">Price: $175.00</h6>
            <small id="reviews" class="form-text text-muted">In stock</small>
          

            <label for="sizes" class="sizing">Size:</label>
            <select class="my-3" name="sizes" id="sizing">
              <option value="1">7.5</option>
              <option value="2">8</option>
              <option value="3">8.5</option>
              <option value="4">9</option>
              <option value="4">9.5</option>
              <option value="4">19</option>
              <option value="4">11</option>
            </select>
            
            <div class="add-btn">
            <button type="button" class="btn btn-dark">Add to cart</button>
            </div>

            <h5 class="item-title mt-4">Description</h5>
              <p class="item-description">
              Anticipated by a lot of people, vegan classics, like this adidas Stan Smith as a vegan alternative.
              The iconic retro tennis shoe from adidas is crafted with a recycled polyester upper, using no animal products
              whatsoever in the creation of the product.
              </p>

              <h5 class="item-title">Materials</h5>
              <p class="materials">
              Anticipated by a lot of people, vegan classics, like this adidas Stan Smith as a vegan alternative.
              The iconic retro tennis shoe from adidas is crafted with a recycled polyester upper, using no animal products
              whatsoever in the creation of the product.
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
  
    //Loggar ut artikelnumret - ta bort sen
    console.log(artno);

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
}}
