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
        //window.location.href = 'productdetails.html';
        productdetail(event);
      });
    });
  });
}

function productdetail(event) {
  //När man klickat på en bild, hämta artikelnumret och skicka användaren till den URL:en med ?artno...
    window.location.assign('http://localhost:8888/#nominate');
    
    let container = document.getElementsByClassName("product-wrapper");
    let productimagewrapper = document.getElementsByClassName("productimage-wrapper");
    let productimage = `<img src="${item.imgURL}" alt="${item.model + " " + item.brand}"
    class="productimage-1"> 
    `;

    document.getElementById("product-wrapper").appendChild(product-image); 


/*if... else.. Det som händer efter användaren har skickats till rätt sida.
/Produktdatan hämtas & presenteras på skärmen*/

}

function addToCart(event) {
  const artno = event.target.getAttribute("data-value");
  console.log(artno);
}



// <div class="container-fluid">
//   <div class="container product-wrapper"> 
//   <div class="container product-div">
//     <div class="productimage-wrapper">
//       <div class="product-image">

//         <!-- Här inne ligger produktbilder och beskrivning-->

//       </div>
//       </div>
//   </div>
//   </div>
// artno: "Dm7582-100",
// model: "Blazer Low '77 Premium",
// brand: "Nike",
// price: 99,
// sizes: ["7.5", "8", "8.5", "9", "9.5", "10", "11"],
// colors: ["Coconut milk", "Forest green", "Beige"],
// sex: "Men",
// imgURL: "https://www.sneakersnstuff.com/images/314995/product_medium.jpg",
// imgURL2: "https://www.sneakersnstuff.com/images/314994/dm7582-100-2.jpg",
// imgURL3: "https://www.sneakersnstuff.com/images/314996/dm7582-100-1.jpg",
// instock: true,
// description: "An unusual combination of materials and a 