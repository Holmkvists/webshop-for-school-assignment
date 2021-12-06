import { catalog } from "./models/product-catalog";
import { headerFunction } from "./header";
import { preventExtensions } from "core-js/core/object";

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
        event.preventDefault();
      });
    });
  });
}

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
  const artno = event.target.getAttribute("data-value");
  console.log(artno);
}
