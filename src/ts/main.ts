import { catalog } from "./models/product-catalog";
import { headerFunction } from "./header";

window.onload = () => {
  console.log("Hello");
  print_products();
  headerFunction;
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
            <p class="text-sm font-medium text-gray-900">$${item.price}</p>
            <button class="add-to-cart" data-value="${item.artno}">Add</button>
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
  const artno = event.target.getAttribute("data-value");
  console.log(artno);
}

function addToCart(event) {
  const artno = event.target.getAttribute("data-value");
  console.log(artno);
}
