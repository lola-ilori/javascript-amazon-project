      //first step is creating the Array & objects like const product= [{}]. but we already created a js file specifically for the products. we just include it in the html file and use it here.
import {cart} from '../data/cart.js'; //importing the cart array from cart.js file. This is where the cart items are stored.

      //second step
let productsHTML = ''; //this is for combining all the html strimngs together. It starts as an empty string and will be filled with the html for each product.

      //third step
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

//console.log(productsHTML)
      //4th step - pushing the js-html file to the html
document.querySelector('.js-products-grid').innerHTML = productsHTML;

      //5th step- making the add-to cart btn interactive
document.querySelectorAll('.js-add-to-cart')
.forEach(function(button) { //Each (button) is one button)
    let toastTimeoutId = null; //must be declared outside the function of click.

  button.addEventListener('click', function (){
    const productId = button.dataset.productId //the button.dataset is used to get the html product data. JS converts whatever is in the data-product-id(kebab-case) to button.dataset.productId(camelCase)

    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value); //gets the quantity selected in the dropdown. 'Number() converts to a number from DOM string.

    let matchingItem;

    //this code just stores a reference.
    cart.forEach(function(item) { //to loop through cart Array. Each (item) is one object like {productName: "Toaster Black", quantity: 1}
        if(productId === item.productId) {
          matchingItem = item; //matchingItem becomes an object.
      };
    })

    // this code controls the display
    if(matchingItem) { //if matchingItem is already present in the cart
      matchingItem.productQuantity += productQuantity;
    } else {
      cart.push({ //push the productName and produtQuantity to the cart array. N.B cart array is in cart.js
        productId : productId,
        productQuantity : productQuantity
      });
    };

    //controls the display in the cart Icon
    let cartQuantity = 0; //this is to count the total quantity of items in the cart

    cart.forEach(function(item) {
      cartQuantity += item.productQuantity; //loop through each cart object and add up the quantity from one to the next.
    });

    //making the cart icon interactive
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; //display in html

    //shows the btn toast
    const btnToast = document.querySelector(`.js-btn-toast-${productId}`)
    if(!btnToast) return; //it stops the function if the productId returns a null or something.
    btnToast.classList.add('btn-toast-visible');

    if(toastTimeoutId) { //check it previous Timeoutexist and stop it
      clearTimeout(toastTimeoutId);
    }
  
    const timeoutId = setTimeout(() => {
      btnToast.classList.remove('btn-toast-visible'); 
    }, 2000); //removes the btn toast after 2 seconds

    toastTimeoutId = timeoutId; //save the timeoutID so we can stop it later

  });
  
})