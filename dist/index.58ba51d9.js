// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"e4k7L":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "088b4c0858ba51d9";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"7BLcd":[function(require,module,exports) {
var _productCatalog = require("./models/product-catalog");
var _header = require("./header");
var _localStorage = require("./localStorage");
var _calcPrice = require("./calcPrice");
let cart1 = [];
let displayProducts = _productCatalog.catalog.slice(0);
let sort = {
    key: "property",
    asc: true
};
let selectedBrandsFilters = [];
let selectedColorsFilters = [];
let selectedCategoriesFilters = [];
let cartAmount = document.getElementById("cart-amount");
let container = document.getElementById("product-container");
window.onload = ()=>{
    if (_localStorage.fromLocalStorage("cart")) {
        cart1 = _localStorage.fromLocalStorage("cart");
        cartAmount.innerHTML = "" + cart1.length;
        printCart(_localStorage.fromLocalStorage("cart"));
    }
    print_products(_productCatalog.catalog);
    document.getElementById("searchbarContainer").addEventListener("keyup", searchProducts);
    filterOptions();
    document.getElementById("close").addEventListener("click", _header.closecart);
    document.getElementById("bag").addEventListener("click", _header.opencart);
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
    ProductsObjects.map((item1)=>{
        let product = `
        <div class="group relative">
            
            <div class="image relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
            <img src="${item1.imgURL}" alt="${item1.model + " " + item1.brand}" class="product-img w-full h-full object-center object-cover lg:w-full lg:h-full">   
                <div class="overlay"><a href="${item1.artno}" data-value="${item1.artno}" class="view-product">View Product</a></button></div>

            </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                  ${item1.model}
              </h3>
              <p class="mt-1 text-sm text-gray-500">${item1.brand}</p>
            </div>
            <div class="flex-col">
            <p class="text-sm font-medium text-gray-900 text-right">$${item1.price}</p>
              <div id="${item1.artno}" class="add-state">
                <button class="add-to-cart" data-value="${item1.artno}">Add</button>
              </div>
            </div>
            </div>
            </div>
      `;
        container.innerHTML += product;
        document.querySelectorAll(".add-to-cart").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                addToCart(event);
            });
        });
        document.querySelectorAll(".view-product").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                event.preventDefault();
                let artno = event.target.getAttribute("data-value");
                displayProductdetails(artno);
            });
        });
    });
}
//Prints out targeted product
function displayProductdetails(artno) {
    let url = window.location.pathname;
    let path = /[^/]*$/.exec(url)[0];
    let product1 = _productCatalog.catalog.filter((product)=>product.artno === artno
    );
    if (product1) product1.map((item2)=>{
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
             <img class="img-fluid w-100" src="${item2.imgURL}" alt="${item2.model + " " + item2.brand}"/>
             
               <div class="small-img-group mb-4">
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${item2.imgURL2}" alt="${item2.model + " " + item2.brand}"/>
                 </div>
 
                 <div class="small-img-col mt-2 mx-1">
                   <img class="small-img" width="100%" src="${item2.imgURL3}" alt="${item2.model + " " + item2.brand}"/>
                 </div>
               </div>
             </div>

        
           <div class="col-lg-6 col-md-12 col-12 mb-3">
           <h6>
           <ul class="product-nav">
           <li><a href="#">Shop</a></li>
           <li><a href="#">${item2.sex}</a></li>
           <li><a href="#">${item2.brand}</a></li>
           <li><a href="#">${item2.model}</a></li>
           </ul>
           </h6>

           <div class="container title-container">
            <h4 class="modelname">${item2.model}</h3>
            <h6 class="price">Price: $${item2.price}</h6>
            </div>
 
            <div class="container description-container">
             <h5 class="item-title mt-1">Description</h5>
               <p class="item-description mb-5">
               ${item2.description}
               </p>
            </div>
 
               <div class="row addSneaker mx-auto">
               <button type="button" class="btn btn-dark addSneakerBtn add-to-cart" data-value="${item2.artno}">Add to cart</button>
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
        document.querySelectorAll(".addSneakerBtn").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                addToCart(event);
            });
        });
        event.preventDefault();
    });
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
    let item = _productCatalog.catalog.find((x)=>x.artno === artno
    );
    let itemIndex = cart1.length;
    if (!containsObject(item, cart1)) {
        cart1.push(item);
        console.log(cart1);
        cart1[itemIndex]["quantity"] = 1;
    } else cart1[itemIndex]["quantity"] = cart1[itemIndex]["quantity"] + 1;
    _localStorage.toLocalstorage(cart1, "cart");
    cart1.reduce((total, obj)=>obj.quantity + total
    , 0);
    cartAmount.innerHTML = itemsInCart(cart1);
    document.getElementById("bag").classList.add("animate__headShake");
    setTimeout(function() {
        document.getElementById("bag").classList.remove("animate__headShake");
    }, 800);
    _calcPrice.calculatePrice(cart1);
    printCart(cart1);
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
    add.addEventListener("click", (event)=>{
        addToCart(event);
    });
}
//Function to add to cart from the product details page
function addSneakerToCart(event) {
    let articlenumber = event.target.getAttribute("data-no");
    let clickedBtn = event.target;
    let newItem = _productCatalog.catalog.find((sneaker)=>sneaker.artno === articlenumber
    );
    let itemIndex = cart1.length;
    if (newItem && !containsObject(newItem, cart1)) {
        cart1.push(newItem);
        cart1[itemIndex]["quantity"] = 1;
    } else cart1[itemIndex]["quantity"] = cart1[itemIndex]["quantity"] + 1;
    _localStorage.toLocalstorage(cart1, "cart");
    cart1.reduce((total, obj)=>obj.quantity + total
    , 0);
    cartAmount.innerHTML = itemsInCart(cart1);
    document.getElementById("bag").classList.add("animate__headShake");
    setTimeout(function() {
        document.getElementById("bag").classList.remove("animate__headShake");
    }, 800);
    _calcPrice.calculatePrice(cart1);
}
function printCart(cart) {
    let cartWidget = document.getElementById("cart-widget");
    cartWidget.innerHTML = "";
    cart.map((item3)=>{
        let cartitem = `
    <div class="row mb-4">
    <div class="col-3">
      <img width="100%" src="${item3.imgURL}" alt="">
    </div>
    <div class="col-6">
      <p class="my-0">${item3.model}</p>
      <p class="my-0">${item3.brand}</p>
      <p class="my-0">Size: 7</p>
    </div>
    <div class="col-3 flex flex-col">
      <p class="text-center">$${item3.price}</p>
      <a class="remove-item" data-value="${item3.artno}">Remove</a>
    <div>
    <div class="quantity-field" >
    <button 
    data-value="${item3.artno}"
      class="value-button decrease-button" 
      title="Azalt">-</button>
      <div class="number">${item3.quantity}</div>
    <button 
      data-value="${item3.artno}"
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
        document.querySelectorAll(".remove-item").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                removeitem(event);
            });
        });
        document.querySelectorAll(".decrease-button").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                decreaseItem(event);
            });
        });
        document.querySelectorAll(".increase-button").forEach((item)=>{
            item.addEventListener("click", (event)=>{
                increaseItem(event);
            });
        });
        document.getElementById("totalPrice").innerHTML = "$" + _calcPrice.calculatePrice(cart);
    });
}
function removeitem(event) {
    let artno = event.target.getAttribute("data-value");
    cart1 = cart1.filter((item)=>{
        return item.artno != artno;
    });
    cartAmount.innerHTML = itemsInCart(cart1);
    _localStorage.toLocalstorage(cart1, "cart");
    _calcPrice.calculatePrice(cart1);
    printCart(cart1);
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
    sort = {
        key: key,
        asc: asc
    };
    let compareItemFunction = function(a, b) {
        switch(typeof a[key]){
            case "number":
                return asc ? a[key] - b[key] : b[key] - a[key];
            case "string":
                let propertyA = a[key].toUpperCase();
                let propertyB = b[key].toUpperCase();
                let result = propertyA < propertyB ? -1 : propertyA > propertyB ? 1 : 0;
                return asc ? result : result * -1;
        }
    };
    displayProducts.sort(compareItemFunction);
}
// Filter functions
function filterOptions() {
    let brandsFilters = document.getElementById("brandsFilter");
    let uniqueBrands = getUniqueValues(_productCatalog.catalog, (m)=>m.brand
    );
    for(let i = 0; i < uniqueBrands.length; i++){
        let brandName = uniqueBrands[i];
        let brandsTag = createFilterOption(brandName);
        brandsTag.addEventListener("click", selectBrand);
        brandsFilters.appendChild(brandsTag);
    }
    let colorFilters = document.getElementById("colorsFilter");
    let uniqueColors = getUniqueValues(_productCatalog.catalog, (m)=>m.colors
    );
    for(let i1 = 0; i1 < uniqueColors.length; i1++){
        let colorName = uniqueColors[i1];
        let colorTag = createFilterOption(colorName);
        colorTag.addEventListener("click", selectColor);
        colorFilters.appendChild(colorTag);
    }
    let categoriesFilters = document.getElementById("categoriesFilter");
    let uniqueCategories = getUniqueValues(_productCatalog.catalog, (m)=>m.sex
    );
    for(let i2 = 0; i2 < uniqueCategories.length; i2++){
        let categoryName = uniqueCategories[i2];
        let categoryTag = createFilterOption(categoryName);
        categoryTag.addEventListener("click", selectCategory);
        categoriesFilters.appendChild(categoryTag);
    }
}
function getUniqueValues(arrayOfItems, propertyAccessorCallback) {
    let unique = [];
    for(let i = 0; i < arrayOfItems.length; i++){
        let value = propertyAccessorCallback(arrayOfItems[i]);
        if (unique.indexOf(value) < 0) unique.push(value);
    }
    return unique;
}
function createFilterOption(str) {
    let anchorTag = document.createElement("a");
    anchorTag.setAttribute("class", "dropdown-item");
    anchorTag.setAttribute("href", "javascript:void(0)");
    anchorTag.innerText = str;
    return anchorTag;
}
function selectBrand() {
    let brandOption = this.innerText;
    let selected = !(this.dataset["selected"] == "true");
    if (selected) selectedBrandsFilters.push(brandOption);
    else {
        let index = selectedBrandsFilters.indexOf(brandOption);
        if (index >= 0) selectedBrandsFilters.splice(index, 1);
    }
    this.dataset["selected"] = selected;
    let filtered = _productCatalog.catalog.filter(applyFilter);
    displayProducts = filtered;
    sortItems(sort.key, sort.asc);
    print_products(displayProducts);
    return false;
}
function selectColor() {
    let colorOption = this.innerText;
    let selected = !(this.dataset["selected"] == "true");
    if (selected) selectedColorsFilters.push(colorOption);
    else {
        let index = selectedColorsFilters.indexOf(colorOption);
        if (index >= 0) selectedColorsFilters.splice(index, 1);
    }
    this.dataset["selected"] = selected;
    let filtered = _productCatalog.catalog.filter(applyFilter);
    displayProducts = filtered;
    sortItems(sort.key, sort.asc);
    print_products(displayProducts);
    return false;
}
function selectCategory() {
    let categoryOption = this.innerText;
    let selected = !(this.dataset["selected"] == "true");
    if (selected) selectedCategoriesFilters.push(categoryOption);
    else {
        let index = selectedCategoriesFilters.indexOf(categoryOption);
        if (index >= 0) selectedCategoriesFilters.splice(index, 1);
    }
    this.dataset["selected"] = selected;
    let filtered = _productCatalog.catalog.filter(applyFilter);
    displayProducts = filtered;
    sortItems(sort.key, sort.asc);
    print_products(displayProducts);
    return false;
}
function applyFilter(catalogItem) {
    let isBrandMatch = selectedBrandsFilters.length > 0 ? selectedBrandsFilters.indexOf(catalogItem.brand) >= 0 : true;
    let isColorMatch = selectedColorsFilters.length > 0 ? selectedColorsFilters.indexOf(catalogItem.colors) >= 0 : true;
    let isCategoryMatch = selectedCategoriesFilters.length > 0 ? selectedCategoriesFilters.indexOf(catalogItem.sex) >= 0 : true;
    return isBrandMatch && isColorMatch && isCategoryMatch;
}
function resetFilter() {
    displayProducts = _productCatalog.catalog.slice(0);
    document.querySelectorAll(".dropdown-item").forEach((b)=>b.removeAttribute("data-selected")
    );
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
    let filteredProducts = _productCatalog.catalog.filter((item)=>{
        return item.model.toLowerCase().includes(searchFrase) || item.brand.toLowerCase().includes(searchFrase);
    });
    if (filteredProducts.length > 0) print_products(filteredProducts);
}
// Quantity
function increaseItem(e) {
    const artno = e.target.getAttribute("data-value");
    let itemIndex = cart1.findIndex((x)=>x.artno === artno
    );
    cart1[itemIndex].quantity = cart1[itemIndex].quantity + 1;
    cartAmount.innerHTML = itemsInCart(cart1);
    _calcPrice.calculatePrice(cart1);
    printCart(cart1);
    _localStorage.toLocalstorage(cart1, "cart");
}
function decreaseItem(e) {
    const artno = e.target.getAttribute("data-value");
    let itemIndex = cart1.findIndex((x)=>x.artno === artno
    );
    cart1[itemIndex].quantity = cart1[itemIndex].quantity - 1;
    if (cart1[itemIndex].quantity === 0) removeitem(e);
    cartAmount.innerHTML = itemsInCart(cart1);
    _calcPrice.calculatePrice(cart1);
    printCart(cart1);
    _localStorage.toLocalstorage(cart1, "cart");
}
function itemsInCart(cart) {
    return cart.reduce((total, obj)=>obj.quantity + total
    , 0).toString();
}
function containsObject(obj, list) {
    var i;
    for(i = 0; i < list.length; i++){
        if (list[i] === obj) return true;
    }
    return false;
}

},{"./models/product-catalog":"eymG3","./header":"7gBgG","./localStorage":"btSVi","./calcPrice":"6YyZW"}],"eymG3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "catalog", ()=>catalog
);
const catalog = [
    {
        artno: "Dm7582-100",
        model: "Blazer Low '77 Premium",
        brand: "Nike",
        price: 99,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "Beige",
        sex: "Men",
        imgURL: "https://www.sneakersnstuff.com/images/314995/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/314994/dm7582-100-2.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/314996/dm7582-100-1.jpg",
        instock: true,
        description: "An unusual combination of materials and a vintage look define the Nike Blazer range. The Nike Blazer's are available as low-top's and high-top's and in a variety of different colourways and patterns."
    },
    {
        artno: "Da8291-001",
        model: "Wmns Waffle Trainer 2",
        brand: "Nike",
        price: 89,
        sizes: [
            "5",
            "5.5",
            "6",
            "6.5",
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10"
        ],
        colors: "Beige",
        sex: "Women",
        imgURL: "https://www.sneakersnstuff.com/images/314976/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/314977/da8291-001-2.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/314975/da8291-001-1.jpg",
        instock: true,
        description: "Nike Waffle Trainer 2 gives you the original look of Nike Running and celebrates the 50th anniversary of Swoosh. With its classic Waffle sole and retro material that flashes to 70s athletics and its original Swoosh design, it celebrates Nike's humble beginnings."
    },
    {
        artno: "M990cp2",
        model: "990v2",
        brand: "New Balance",
        price: 175,
        sizes: [
            "5"
        ],
        colors: "Multi-color",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/316752/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/316751/02a2531.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/316754/02a2537.jpg",
        instock: true,
        description: "The iconic New Balance Made In US 990v2 has a shock-absorbing ABZORB midsole that provides the support and comfort you need every day. The shoe is made of first-class pigskin and mesh, and gives a timeless style to any outfit."
    },
    {
        artno: "Q46229",
        model: "4D Futurecraft",
        brand: "adidas Performance",
        price: 219,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "White",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/308942/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/308941/product_medium.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/308943/product_medium.jpg",
        instock: true,
        description: "The adidas Futurecraft 4D returns after its original release in 2018. Dressed in Core White, the futuristic cutting-edge adidas sneaker comes with a 4D midsole and a digitally engineered construction, the low-top lightweight adidas shoe comes with a Primeknit upper for a locked-in feel and touch."
    },
    {
        artno: "Da7995-101",
        model: "Waffle One",
        brand: "Nike Sportswear",
        price: 99,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "Beige",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/304586/da7995-101-5.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/304588/product_small.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/304590/product_small.jpg",
        instock: true,
        description: "The Nike Waffle One delivers vibrant colors and the soft materials draw inspiration in the vibes from your favorites among influencers on social media. The speckled shoelaces give the right discreet feel and the right kind of Swoosh style."
    },
    {
        artno: "Q46439",
        model: "Ultra 4D",
        brand: "adidas Performance",
        price: 219,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "Green",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/304856/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/304851/product_small.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/304854/product_small.jpg",
        instock: true,
        description: "When the adidas Ultraboost debuted in 2015, it quickly gained ground far beyond the world of running. With this version, adidas has redesigned their design with a 3D-printed midsole. The denser parts of the grid provide support and the more open parts feel more shock-absorbing. This shoe does not just look like the future. It feels that way too."
    },
    {
        artno: "Dc5331-001",
        model: "Air Max Pre-Day LX",
        brand: "Nike Sportswear",
        price: 139,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "Beige",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/303686/product_medium.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/303691/dc5331-001-6.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/303692/dc5331-001-7.jpg",
        instock: true,
        description: "The Nike Air Max Pre Day LX takes classic details of heritage Nike running into a new realm, this brings you a fast-paced look that's ready for today's world. Made with at least 20% recycled materials by weight, this wardrobe staple combines the retro track aesthetic you know best with a new Air window to help energize the look and feel. The updated rubber Waffle sole adds heritage styling, traction, and durability, inspired by heritage running shoes, the upper features a large retro Swoosh, stitched overlays with throwback looks, and a mix of materials."
    },
    {
        artno: "374921-15",
        model: "Suede VTG",
        brand: "Puma",
        price: 89,
        sizes: [
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "11"
        ],
        colors: "Green",
        sex: "Unisex",
        imgURL: "https://www.sneakersnstuff.com/images/318646/shoes-puma-1.jpg",
        imgURL2: "https://www.sneakersnstuff.com/images/317584/product_xsmall.jpg",
        imgURL3: "https://www.sneakersnstuff.com/images/317583/product_xsmall.jpg",
        instock: true,
        description: "You might have seen the Puma Suede a bunch of times, but did it get as close as possible to the original version like this Puma Suede VTG? Introduced in 1968, this rendition comes with a lower panel, like the OG silhouette back in the days. Equipped with a red upper and white overlays, the Puma Suede is finished off by metallic gold branding."
    }, 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7gBgG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "opencart", ()=>opencart
);
parcelHelpers.export(exports, "closecart", ()=>closecart
);
function opencart() {
    let overlay = document.getElementById("overlay");
    let widget = document.getElementById("cart");
    widget.style.display = "block";
    overlay.classList.add("animate__headShake");
    overlay.style.display = "block";
    window.setTimeout(function() {
        overlay.style.transform = "translate(opacity .25s)";
    }, 0);
    window.setTimeout(function() {
        widget.style.transform = "translate(-420px)";
    }, 0);
    overlay.addEventListener("click", closecart);
}
function closecart() {
    let overlay = document.getElementById("overlay");
    let widget = document.getElementById("cart");
    window.setTimeout(function() {
        widget.style.transform = "translate(0px)";
    }, 0);
    overlay.style.display = "none";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"btSVi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toLocalstorage", ()=>toLocalstorage
);
parcelHelpers.export(exports, "fromLocalStorage", ()=>fromLocalStorage
);
function toLocalstorage(thing, name) {
    localStorage.setItem(name, JSON.stringify(thing));
}
function fromLocalStorage(item) {
    const itemJSON = localStorage.getItem(item);
    if (itemJSON) return JSON.parse(itemJSON);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6YyZW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calculatePrice", ()=>calculatePrice
);
function calculatePrice(cart) {
    let total = 0;
    if (cart.length > 0) for(let i = 0; i < cart.length; i++){
        let price = cart[i].price;
        let quantity = cart[i].quantity;
        total = total + quantity * price;
    }
    return total;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["e4k7L","7BLcd"], "7BLcd", "parcelRequire7390")

//# sourceMappingURL=index.58ba51d9.js.map
