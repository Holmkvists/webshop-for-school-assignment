import { catalog } from "./models/product-catalog";
import { expandSearchbar } from "./header";
import { opencart } from "./header";
import { closecart } from "./header";

let cart = [];
let displayProducts = catalog.slice(0);
let cartAmount = document.getElementById("cart-amount");

window.onload = () => {
  fromLocalStorage();
  cartSummary(cart);
  document.getElementById("close").addEventListener("click", closecart);
  document.getElementById("bag").addEventListener("click", opencart);
};

function cartSummary(cart) {
  if (cart.length === 0) {
    document.getElementById("cart-summary").innerHTML =
      "There are no products in your cart. <br>Please browse our products <a href='/'>here</a>";
  }
  let summary = document.getElementById("cart-summary");
  summary.innerHTML = "";
  let productContainer = document.createElement("div");
  productContainer.classList.add(
    "bg-white",
    "border-r",
    "border",
    "border-gray-400",
    "rounded-xl",
    "p-4"
  );
  summary.appendChild(productContainer);
  cart.map((item) => {
    let cartItems = `
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
    productContainer.innerHTML += cartItems;
    console.log(calculatePrice());

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
  });
}

let container = document.getElementById("product-container");

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
  let added = document.createElement("p");
  added.classList.add("added");
  added.innerHTML = "Added <i class='bi bi-check'></i>";
  added.setAttribute("id", artno);
  addbtn.replaceWith(added);
  let item = catalog.find((x) => x.artno === artno);
  let itemIndex = cart.length;

  // Om produkten finns i varukorg, addera +1 i quantity
  if (!containsObject(item, cart)) {
    cart.push(item);
    cart[itemIndex]["quantity"] = 1;
  } else {
    cart[itemIndex]["quantity"] = cart[itemIndex]["quantity"] + 1;
  }

  toLocalstorage(cart);
  cart.reduce((total, obj) => obj.quantity + total, 0);

  cartAmount.innerHTML = itemsInCart();

  document.getElementById("bag").classList.add("animate__headShake");
  setTimeout(function () {
    document.getElementById("bag").classList.remove("animate__headShake");
  }, 800);
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
  printCart(cart);

  return total;
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
  });
}

function removeitem(event) {
  let artno = event.target.getAttribute("data-value");
  cart = cart.filter((item) => {
    return item.artno != artno;
  });

  cartAmount.innerHTML = itemsInCart();

  toLocalstorage(cart);
  printCart(cart);
  cartSummary(cart);
}

// Quantity
function increaseItem(e) {
  const artno = e.target.getAttribute("data-value");

  let item = cart.find((x) => x.artno === artno);
  let itemIndex = cart.findIndex((x) => x.artno === artno);

  cart[itemIndex].quantity = cart[itemIndex].quantity + 1;

  cartAmount.innerHTML = itemsInCart();
  printCart(cart);
  cartSummary(cart);
  toLocalstorage(cart);
}

function decreaseItem(e) {
  const artno = e.target.getAttribute("data-value");
  let item = cart.find((x) => x.artno === artno);
  let itemIndex = cart.findIndex((x) => x.artno === artno);

  cart[itemIndex].quantity = cart[itemIndex].quantity - 1;

  if (cart[itemIndex].quantity === 0) {
    removeitem(e);
  }

  cartAmount.innerHTML = itemsInCart();
  console.log(cart);
  printCart(cart);
  cartSummary(cart);
  toLocalstorage(cart);
}

function itemsInCart() {
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

function toLocalstorage(thing) {
  localStorage.setItem("cart", JSON.stringify(thing));
}

function fromLocalStorage() {
  const itemJSON = localStorage.getItem("cart");

  if (itemJSON) {
    cart = JSON.parse(itemJSON);
    cartAmount.innerHTML = itemsInCart();
    printCart(cart);
  }
}
