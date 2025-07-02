//1st step- IMPORTING ARRAYS
import {cart, removeFromCart} from '../data/cart.js'; //importing the cart array from cart.js file. This is where the cart items are stored.
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
    `<div class="cart-item-container">
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
                Quantity: <span class="quantity-label">${cartItem.productQuantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
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

//7th STEP - MAKING ALL LINKS INTERACTIVE
document.querySelectorAll('.js-delete-link')
  .forEach(function(link){ // 'link' works as for each <a> link
    link.addEventListener('click', function(){
      const productId = link.dataset.productId;
      removeFromCart(productId); //call the removeFromCart function imported from cart.js
      console.log(cart)
    });
  })
