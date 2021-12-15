import { opencart } from "./header";
import { closecart } from "./header";
import { fromLocalStorage } from "./localStorage";
import { toLocalstorage } from "./localStorage";
import { calculatePrice } from "./calcPrice";

let cart = [];
let cartAmount = document.getElementById("cart-amount");
let customerObject = {};

window.onload = () => {
  if (fromLocalStorage("cart")) {
    cart = fromLocalStorage("cart");
    cartAmount.innerHTML = "" + cart.length;
    printCart(fromLocalStorage("cart"));
  }
  cartSummary(cart);
  document.getElementById("close").addEventListener("click", closecart);
  document.getElementById("bag").addEventListener("click", opencart);
};

function cartSummary(cart) {
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
          <a class="summary-remove-item" data-value="${item.artno}">Remove</a>
        <div>
        <div class="quantity-field" >
        <button 
        data-value="${item.artno}"
          class="value-button summary-decrease-button" 
          title="Azalt">-</button>
          <div class="number">${item.quantity}</div>
          <button 
            data-value="${item.artno}"
            class="value-button summary-increase-button" 
            title="Arrtır"
          >+
          </button>
        </div>
      </div>
    </div>
  </div>
      `;
    productContainer.innerHTML += cartItems;

    document.querySelectorAll(".summary-remove-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        removeitem(event);
      });
    });
    document.querySelectorAll(".summary-decrease-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        decreaseItem(event);
      });
    });
    document.querySelectorAll(".summary-increase-button").forEach((item) => {
      item.addEventListener("click", (event) => {
        increaseItem(event);
      });
    });
  });
  let price = document.createElement("span");
  price.innerHTML = "Total price is $" + calculatePrice(cart);
  productContainer.appendChild(price);
  if (cart.length === 0) {
    document.getElementById("cart-summary").innerHTML =
      "There are no products in your cart. <br>Please browse our products <a href='/'>here</a>";
  }
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

  toLocalstorage(cart, "cart");
  printCart(cart);
  cartSummary(cart);
}

// Quantity
function increaseItem(e) {
  const artno = e.target.getAttribute("data-value");

  let itemIndex = cart.findIndex((x) => x.artno === artno);

  cart[itemIndex].quantity = cart[itemIndex].quantity + 1;

  cartAmount.innerHTML = itemsInCart();
  printCart(cart);
  toLocalstorage(cart, "cart");
  cartSummary(cart);
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
  printCart(cart);
  cartSummary(cart);
  toLocalstorage(cart, "cart");
}

function itemsInCart() {
  return cart.reduce((total, obj) => obj.quantity + total, 0).toString();
}

function proceedPurchase() {
  let firstname = (document.getElementById("firstName") as HTMLInputElement)
    .value;
  let lastname = (document.getElementById("lastName") as HTMLInputElement)
    .value;
  let username = (document.getElementById("username") as HTMLInputElement)
    .value;
  let email = (document.getElementById("email") as HTMLInputElement).value;
  let address = (document.getElementById("address") as HTMLInputElement).value;
  let address2 = (document.getElementById("address2") as HTMLInputElement)
    .value;

  let zip = (document.getElementById("zip") as HTMLInputElement).value;
  let nameOnCard = (document.getElementById("cc-name") as HTMLInputElement)
    .value;
  let cardNumber = (document.getElementById("cc-number") as HTMLInputElement)
    .value;
  let expiration = (
    document.getElementById("cc-expiration") as HTMLInputElement
  ).value;
  let cvv = (document.getElementById("cc-cvv") as HTMLInputElement).value;
  customerObject["firstname"] = firstname;
  customerObject["lastname"] = lastname;
  customerObject["username"] = username;
  customerObject["email"] = email;
  customerObject["address"] = address;
  customerObject["address2"] = address2;

  customerObject["zip"] = zip;
  customerObject["nameOnCard"] = nameOnCard;
  customerObject["cardNumber"] = cardNumber;
  customerObject["expiration"] = expiration;
  customerObject["cvv"] = cvv;
  toLocalstorage(customerObject, "customer");
  if (fromLocalStorage("customer") && fromLocalStorage("cart")) {
    displayThankYou();
  }
}

(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              proceedPurchase();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

function displayThankYou() {
  let checkoutContainer = document.getElementById("checkout-container");
  let banner = document.getElementById("banner");
  banner.innerHTML = "";
  banner.innerHTML = `<span class="text-2xl font-light">Purchase was <b
  <b
    class="
      text-transparent
      bg-clip-text bg-gradient-to-br
      from-green-400
      to-green-600
      font-medium
    ">Successful</b></span>`;
  let cart = fromLocalStorage("cart");
  let customer = fromLocalStorage("customer");
  let customerContent = `
    <div class="my-10 text-center">
      <h2>Thank you for the purchase ${customer.firstname}</h2>
      <p>Your order will arrive within 3-5 business days.</p>
    </div>
    
    <div class="col-7 mx-auto mb-10 p-4 border border-r border-gray-400 rounded-xl">
      <div class="flex mb-10">
        <div class="col">
          <p><b>Firstname: </b>${customer.firstname}</p>
          <p><b>Lastname: </b>${customer.lastname}</p>
          <p><b>Email: </b>${customer.email}</p>
        </div>
        <div class="col">
        <p><b>Address: </b>${customer.address}</p>
        <p><b>Country: </b>Sweden</p>
        <p><b>Zip: </b>${customer.zip}</p>
      </div>
      </div>
      <div id="cart-sumup" class="row mb-4">
        
      </div>
    </div>
    
    `;
  checkoutContainer.innerHTML = customerContent;
  let cartElements = fromLocalStorage("cart");

  let productContainer = document.getElementById("cart-sumup");
  cartElements.map((item) => {
    let cartItems = `
    <div class="row mb-4">
        <div class="col-3">
          <img width="100%" src="${item.imgURL}" alt="">
        </div>
        <div class="col-6">
          <p class="my-0">${item.model}</p>
          <p class="my-0">${item.brand}</p>
        </div>
        <div class="col-3 flex flex-col">
          <p class="text-center">$${item.price}</p>
        <div>
      </div>
    </div>
  </div>
      `;

    productContainer.innerHTML += cartItems;
  });
  productContainer.innerHTML += `
    <div class="row px-2">
      <div class="col">Total</div>
      <div class="col text-right">$${calculatePrice(cart)}</div>
    </div>
  `;
}
