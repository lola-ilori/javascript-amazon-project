// create a function for formatting all currency so we'll use it across the page
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}