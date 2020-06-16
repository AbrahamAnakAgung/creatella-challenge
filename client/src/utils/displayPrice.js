/* 
function to correctly display price 
@params
  cents: float number, 0.00 < number in cents
@return
  result: string, HTML string
*/
export const displayPrice = (cents) => {
  let priceInString = "" + cents / 100; // convert to string
  priceInString = priceInString.split(".");
  return [priceInString[0], priceInString[1]];
};
