import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';//Store the Devlivery data as a template. since its the same across all item.
import {formatCurrency} from '../scripts/shared-functions/money.js'; //coming from money.js where all currency formatting lies.

export const deliveryOptions = [ //contains each delivery options as an object
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
  }, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
  }, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
  }
];

//calculates the delivery date from the day.js external libraries
export function calculateDeliveryDate(matchingDeliveryOption) {
  //matchingDeliveryOption: an object like { id: '1', deliveryDays: 3, priceCents: 499 }
  let deliveryDate = dayjs(); // date starting from today
  let remainingDays = matchingDeliveryOption.deliveryDays;//adding today to no of days

  while(remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day'); //add 1 actual day to the today's date.
    const dayOfWeek = deliveryDate.day(); // dayOfWeek: 0 (Sun), 1 (Mon), ..., 6 (Sat)

    if(dayOfWeek !== 0 && dayOfWeek !==6) { //if daysOf week is not sat & sun
      remainingDays --
    };
    //means today is Friday, add 1 business day, if its sat- skip, sun-skip, mon +1 then deliveryDate is $d:Mon Jul 08 25 00:00:00(not a readable format)
  };

  const dateString = deliveryDate.format('dddd, MMMM D'); //displaying into a readable format
  const priceString = matchingDeliveryOption.priceCents === 0 
  ? 'FREE Shipping'
  : `$${formatCurrency(matchingDeliveryOption.priceCents)} - Shipping`; //if the priceCents is 0, display FREE, else display the price in dollars

  return { // wrap in object cos we are returning 2 variables.
    dateString: dateString, //return the delivery date in a readable format
    priceString: priceString, //return the price in dollars or FREE
  };
};

//this function finds the delivery details with the deliveryOption ID and can be used to retrieve all delivery details
export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption; 

    deliveryOptions.forEach(function(option) { //loop through each deliveryOption
      if(option.id === deliveryOptionId) { //
        matchingDeliveryOption = option; //save the object into the empty array for matching Ids
      }
    });
    return matchingDeliveryOption || deliveryOptions[0]; //if the deliveryOptionId isnt found, use the first deliveryOptions-Object as default
}