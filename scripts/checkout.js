//1st step- IMPORTING ARRAYS
import {cart, removeFromCart, calculateCartQuantity, decreaseCartItem, increaseCartItem} from '../data/cart.js'; //importing the cart array from cart.js file. This is where the cart items are stored.
import {products} from '../data/products.js'; //importing the products array from products.js file. 

import {formatCurrency} from './shared-functions/money.js'; //coming from money.js where all currency formatting lies.


//2nd step: LOOP CART ARRAY
let cartSummaryHTML = ''; //an empty array to store html

cart.forEach(function(cartItem) {

  const productId = cartItem.productId

  //4th step: EXTRACTING ALL INFO ON PRODUCTID
  let matchingProduct; //an empty varaible waitiing to be house objects/anything

  products.forEach(function(product){ //product represent each object in products array
    if(product.id === productId) {
      matchingProduct = product; //save the product object that matches the cartItem productId into the matchingProduct. N:B we are saving each objects not the whole array.
    }
  });

  //5th STEP: GENERATE HTML FOR EACH CART ITEM 
  cartSummaryHTML += 
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)} 
            </div>
            <div class="product-quantity">
              <span>
                
                <span class="quantity-label">
                  <button class="quantity-btn cart-decrease js-quantity-decrease disabled" data-product-id = "${matchingProduct.id}">-</button>
                  <span class = "cart-product-quantity js-cart-product-quantity" data-product-id = "${matchingProduct.id}">${cartItem.productQuantity}</span>
                  <button class= "quantity-btn cart-increase js-quantity-increase" data-product-id = "${matchingProduct.id}">+</button>
                </span>
              </span>
              <!--<span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                Update
              </span>-->
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  `;
})

//6th STEP - PUSHING THE js-html FILE TO THE HTML
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
// ASIDE: disables the minus-btn as soon as the page loads if the productQuantity is 1
cart.forEach(function(cartItem) {
  if (cartItem.productQuantity === 1) {
    const minusBtn = document.querySelector(`.js-quantity-decrease[data-product-id="${cartItem.productId}"]`);
    if (minusBtn) minusBtn.disabled = true;
  }
});
cartCount(); // update the checkout item count

//7th STEP - MAKING ALL LINKS INTERACTIVE
document.querySelectorAll('.js-quantity-decrease')
  .forEach(function(link) {
    link.addEventListener('click', function() {
      const productId = link.dataset.productId;

      decreaseCartItem(productId); //call the decreaseCartItem function imported from cart.js
      
      cartCount();
    });
  });

  document.querySelectorAll('.js-quantity-increase')
  .forEach(function(link) {
    link.addEventListener('click', function() {
      const productId = link.dataset.productId;

      increaseCartItem(productId); //call the decreaseCartItem function imported from cart.js
      
      cartCount();
    })
  })


document.querySelectorAll('.js-delete-link') //Delete link.
  .forEach(function(link){ // 'link' works as for each <a> link
    link.addEventListener('click', function(){
      const productId = link.dataset.productId;

      //8th STEP - DELETE ITEM FROM CART
      removeFromCart(productId); //call the removeFromCart function imported from cart.js

      //  9th STEP -  REMOVE ITEM FROM THE PAGE/HTML
      const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`); //assign an Id to each cart container nd bring it here

      cartCount(); //update the checkOUT Item count
      cartContainer.remove(); //remove the cart container from the page
    });
  });

//10th STEP - UPDATE THE TOTAL CHECKOUT ITEM COUNT
function cartCount() {
  const count = calculateCartQuantity();//store it in a variable cos we re using it twice.
  document.querySelector('.js-total-checkout-items').innerHTML =
    count < 2 ? `${count} item` : `${count} items`;
}