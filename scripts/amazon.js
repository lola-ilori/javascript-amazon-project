//1st step  CREATING ARRAYS & OBJECTS like const product= [{}]. 
import {products} from '../data/products.js'; //importing the products array from products.js file. 
import {cart, addToCart} from '../data/cart.js'; //importing the cart array from cart.js file. This is where the cart items are stored.

//2nd step
let productsHTML = ''; //this is for combining all the html strings together. It starts as an empty string and will be filled with the html for each product.

//3rd step- GENERATE THE HTML IN JS
products.forEach(function(product) { //loop through each product & generate the html
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-btn-toast-${product.id}">
        <img src="images/icons/checkmark.png">
        Added to cart!
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}"> <!-- use the product-id instead of a product-name so as to make each product unique -->
        Add to Cart
      </button>
    </div>
  `;
})

//4th STEP - PUSHING THE js-html FILE TO THE HTML
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//5th STEP- MAKING THE add-to-cart BTN WORK- has been moved to cart.js


//6TH STEP  UPDATING THE QUANTITY SUM IN CART ICON.
function updateCartIcon() {
  let cartQuantity = 0; //this is to count the total quantity of items in the cart

  cart.forEach(function(cartItem) {
    cartQuantity += cartItem.productQuantity; //loop through each cart object and add up the quantity from one to the next.
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; //display in html
}

//7TH STEP SHOW THE BTN TOAST IN add to cart.
const toastTimeouts = {}; // an empty array that we'll use below to contain productId:, timeoutId:
function showButtonToast (productId) {
  const btnToast = document.querySelector(`.js-btn-toast-${productId}`)
  if(!btnToast) return; //it stops the function if the productId returns a null or something.

  btnToast.classList.add('btn-toast-visible');//add a class to make toast visible by styling in css

//check it previous Timeout exists and clears it
  if(toastTimeouts[productId]) { // refer to Objects & SetTimeout in my notes.
    clearTimeout(toastTimeouts[productId]);
  }
//set new timeout
  const timeoutId = setTimeout(() => {
    btnToast.classList.remove('btn-toast-visible');
    toastTimeouts[productId] = null;
  }, 2000); 
}

//OVERALL MAKING THE add-to-cart BTN INTERACTIVE
document.querySelectorAll('.js-add-to-cart')
.forEach(function(button) { //Each (button) is one button
  button.addEventListener('click', function (){
    const productId = button.dataset.productId //the button.dataset is used to get the html product data. JS converts whatever is in the data-product-id(kebab-case) to button.dataset.productId(camelCase)

    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value); //gets the quantity selected in the dropdown. 'Number() converts to a number from DOM string
    
    addToCart(productId, productQuantity); //calls the addToCart function with the productId and productQuantity as arguments
    
    updateCartIcon();

    showButtonToast(productId);
  });
})