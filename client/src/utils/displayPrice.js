/**
 * function to correctly display price in $
 * @param {number} cents 
 * @return {string[]} 
 */
export const displayPrice = (cents) => {
  let priceInString = "" + cents / 100; // convert to string
  priceInString = priceInString.split(".");
  return [priceInString[0], priceInString[1] || '00'];
};
