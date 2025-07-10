import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import {loadFromStorage} from "../data/cart.js"; //importing the cart array from cart.js
import '../data/cart-class.js'; //importing all the code in cart-oop.js.


//loadFromStorage(); //load the cart array from local storage when the page loads
renderOrderSummary(); //call the function to render the order summary on page load
renderPaymentSummary(); //call the function to render the payment summary on page load