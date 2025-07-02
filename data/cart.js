export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productQuantity: 2
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productQuantity: 1
  }
] //exporting the cart array to the main amazon.js file. its called module.

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
};