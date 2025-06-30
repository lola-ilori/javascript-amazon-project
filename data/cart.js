export const cart = [] //exporting the cart array to the main amazon.js file. its called module.

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