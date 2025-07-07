//Store the Devlivery data as a template. since its the same across all item.
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