//turning the cart functions in cart-class.js to an object of oop.
//then create a function to store the objects created using PascalCase

class Cart {
  cartObjects; //same as cartObjects = undefined;

  localStorageName;

  constructor (localStorageName) {
    this.localStorageName = localStorageName; //set the localStorageName for the cart object

    this.loadFromStorage(); //load the cart array from local storage


  }

  loadFromStorage() { //shortcut for 'function loadFromStorage(){}'
    this.cartObjects = JSON.parse(localStorage.getItem(this.localStorageName)); //get the cart array from local storage.
    if(!this.cartObjects) {//if the cart array is empty, use this default array
      this.cartObjects = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 2,
          deliveryOptionId: '1' //add a deliveryOptions id to each placeholder product
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          productQuantity: 1,
          deliveryOptionId: '2' //add a deliveryOptions id to each placeholder product
        }
      ]; 
    };//exporting the cart array to the amazon.js,checkout file. its called module.
  }

  //SAVING THE CART ARRAY TO LOCAL STORAGE
  saveToStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.cartObjects)); //save the cart array to anyname(localStorageName) which will be added when we call the function below. JSON.stringify converts the cart array to a string so it can be saved.
  }

  //5th STEP- MAKING THE add-to-cart BTN WORK     
  addToCart(productId, productQuantity) {
    //this code just stores a reference.
    let matchingItem; 
    
    this.cartObjects.forEach(function(cartItem) { //to loop through cart Array. Each (item) is one object like {productName: "Toaster Black", quantity: 1}
      if(productId === cartItem.productId) {
        matchingItem = cartItem; //matchingItem becomes an object.
    };
    });
  
    // this code controls the display
    if(matchingItem) { //if matchingItem is already present in the cart
      matchingItem.productQuantity += productQuantity;
    } else {
      this.cartObjects.push({ //push the productName, produtQuantity &deliveryOption to the cart array. N.B cart array is in cart.js
        productId : productId,
        productQuantity : productQuantity,
        deliveryOptionId: '1' //default delivery option id
      });
    };
  
  
    this.saveToStorage(); //call the function to save the cart array to local storage
  }

  //this code controls the increase & decrease of the product
  decreaseCartItem(productId) {
    let matchingItem; //variable to hold matching productId

    this.cartObjects.forEach(function(cartItem){
      if(cartItem.productId === productId) {
        matchingItem = cartItem; //stores identical productId in matchingItem
      }
    });
  
    if(matchingItem.productQuantity > 1) {
      matchingItem.productQuantity -= 1; //decrease the productQuantity by 1

      this.saveToStorage(); // save the cart array to local storage
      this.updateproductQuantityUI(productId, matchingItem.productQuantity); //update the UI to reflect the new quantity
    }

  }

  increaseCartItem(productId) {
    let matchingItem; //variable to hold matching productId

    this.cartObjects.forEach(function(cartItem){
      if(cartItem.productId === productId) {
        matchingItem = cartItem; //stores identical productId in matchingItem
      }
    });
    
    if(matchingItem.productQuantity <= 9) { //check if the productQuantity is greater than 0 and less than 99
      matchingItem.productQuantity += 1; //increase the productQuantity by 1

      this.saveToStorage(); // save the cart array to local storage
      this.updateproductQuantityUI(productId, matchingItem.productQuantity); //update the UI to reflect the new quantity
    }
  }

  updateproductQuantityUI(productId, productQuantity) {
    const cartProductQuantity = document.querySelector(`.js-cart-product-quantity[data-product-id = "${productId}"]`);
    const minusBtn = document.querySelector(`.js-quantity-decrease[data-product-id = "${productId}"]`);
  
    if(cartProductQuantity) {
      cartProductQuantity.innerHTML = productQuantity; //update the quantity in the cart display
    }
  
    if(minusBtn) {
      minusBtn.disabled = productQuantity <= 1; //disable the minus button if the quantity is less than or equal to 1  
    }
  }

  //this code deletes product from the order summary
  removeFromCart(productId){ //delete the product from the cart, 'productId' means the id of the product to be deleted.
    const newCart = []; //create a new array to hold the items that are not deleted

    this.cartObjects.forEach(function(cartItem){//check the cart for productID that matches the one to be deleted. 'cartItem' is each object in the cart array.
      if(cartItem.productId !== productId) {
        newCart.push(cartItem); //if it doesn't match, push the item to the new array so that the new array containes objects that are NOT deleted
      };
    });

    this.cartObjects = newCart; //reassign the cart varaible to the newCart created.
    this.saveToStorage(); //save the cart array to local storage
  }

  // this calcultes the cartQuantity and updates it to be used in Checkout Display
  calculateCartQuantity() {
    let cartQuantity = 0; //count the total quantity of items in the cart

    this.cartObjects.forEach(function(cartItem){
      cartQuantity +=cartItem.productQuantity; //add the quantity of each item in the cart to the cartQuantity
    });

    return cartQuantity; //return the total quantity of items in the cart
  }

  //this updates the deliveryOptionId in the cart array
  updateDeliveryOption(productId, deliveryOptionId) {
    //duplicate code from addToCart function
    let matchingItem;
    
    this.cartObjects.forEach(function(cartItem) { 
      if(cartItem.productId === productId) { 
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId; //set the product delivery option to this new deliveryid instead of the existing one
  
    this.saveToStorage(); //save the cart array to local storage
  }

}

//creating a cart that can be used for business. OOp allows to build several carts 
const cart = new Cart('cart-oop'); //store the cart object in a variable & pass a random localStorageName
const cartBusiness = new Cart('cart-business'); //store the cart object in a variable & pass a random localStorageName




console.log(cart, cartBusiness)
 



















