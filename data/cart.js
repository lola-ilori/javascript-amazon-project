export let cart = JSON.parse(localStorage.getItem('cart')); //get the cart array from local storage.

if(!cart) {//if the cart array is empty, use this default array
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      productQuantity: 2
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      productQuantity: 1
    }
  ]; 
}//exporting the cart array to the amazon.js,checkout file. its called module.


//SAVING THE CART ARRAY TO LOCAL STORAGE
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); //save the cart array to local storage. JSON.stringify converts the cart array to a string so it can be saved.
}


//5th STEP- MAKING THE add-to-cart BTN WORK
export function addToCart(productId, productQuantity) {

  //this code just stores a reference.
  let matchingItem; 
  
  cart.forEach(function(cartItem) { //to loop through cart Array. Each (item) is one object like {productName: "Toaster Black", quantity: 1}
    if(productId === cartItem.productId) {
      matchingItem = cartItem; //matchingItem becomes an object.
  };
  });

  // this code controls the display
  if(matchingItem) { //if matchingItem is already present in the cart
    matchingItem.productQuantity += productQuantity;
  } else {
    cart.push({ //push the productName and produtQuantity to the cart array. N.B cart array is in cart.js
      productId : productId,
      productQuantity : productQuantity
    });
  };

  saveToStorage(); //call the function to save the cart array to local storage
};

//this code deletes product from the order summary
export function removeFromCart(productId){ //delete the product from the cart, 'productId' means the id of the product to be deleted.
  const newCart = []; //create a new array to hold the items that are not deleted

  cart.forEach(function(cartItem){//check the cart for productID that matches the one to be deeted. 'cartItem' is each object in the cart array.
    if(cartItem.productId !== productId) {
      newCart.push(cartItem); //if it doesn't match, push the item to the new array so that the new array containes objects that are NOT deleted
    };
  });

  cart = newCart; //reassign the cart varaible to the newCart created.
  saveToStorage(); //call the function to save the cart array to local storage
};