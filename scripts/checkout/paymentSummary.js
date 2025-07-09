//1 STEP: IMPORT ALL THE FUNCTIONS & ARRAY NEEDED
import { cart, calculateCartQuantity } from "../../data/cart.js";
import { formatCurrency } from "../shared-functions/money.js";
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption, deliveryOptions } from "../../data/deliveryOptions.js"; 
    
    
    
 //1st STEP: LOOP THE ARRAY AND SAVE IN A FUNCTION   
export function renderPaymentSummary() {
  let totalProductPriceCents = 0; //a varaiable that stores the overall sum of the product prices
  let totalShippingPriceCents = 0; /// a variable that stores the overall sum of the delivery prices

  cart.forEach(function(cartItem){
    //2nd STEP: GET PRODUCT DETAILS
    const matchingProduct = getProduct(cartItem.productId);//use the getProduct function to get product details and each CcartItem has a productId, hence the cartItem.productId

    //3rd STEP: FOR EACH PRODUCT, MULTIPLY PRODUCT PRICE BY QUANTITY
    //matchingProduct.priceCents * cartItem.productQuantity

    //4th STEP: SUM UP THE PRODUCT PRICE FOR EACH ITEM
    totalProductPriceCents += matchingProduct.priceCents * cartItem.productQuantity; //sum up all the price*quantity for each item.

    //5th STEP: SHIPPING & HANDLING(DELIVERY PRICES)
    const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId); //use the getDeliveryOption function to get delivery details & each CcartItem has a deliveryOptionId, hence the cartItem.deliveryOptionId

    //6th STEP: FOR EACH PRODUCT, GET THE DELIVERY PRICES FOR EACH DELIVERY OPTION
    //matchingDeliveryOption.priceCents; 

    //7th STEP: SUM UP THE DELIVERY PRICES FOR EACH PRODUCT
    totalShippingPriceCents += matchingDeliveryOption.priceCents; 
  })

  //8th STEP: TOTAL BEFORE TAX
    const totalBeforeTaxCents = totalProductPriceCents + totalShippingPriceCents; //sum up the total product price and the total shipping price

  //9th STEP: ESTIMATED TAX
    const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1); //10% of the total before tax

  //10th STEP: ORDER TOTAL
    const orderTotalCents = estimatedTaxCents + totalBeforeTaxCents; //sum up the estimated tax and the total before tax


  //11th STEP: GENERATE THE HTML
    let paymentSummaryHTML = 
    `
      <div class="payment-summary-title">
        Payment Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalProductPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(totalShippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(orderTotalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
   `;
  //12th STEP: PUSH THE HTML TO THE PAYMENT SUMMARY SECTION
   document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML; //push the html to the payment summary section in the checkout page  
};
