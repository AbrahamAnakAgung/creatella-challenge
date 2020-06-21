/**
 * function to create random number from 0 - 1000
 * @return {number} random number
 */

let prevRandom = 0;

export const randomize = () => {
  let randomNumber = Math.floor(Math.random() * 1000);

  while (lastDigit(prevRandom) === lastDigit(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 1000);
  }
  prevRandom = randomNumber;
  return randomNumber;
};

/**
 * check the last digit of a number.
 * @param {number} n number between 0 - 1000
 * @return {string} last digit of the number in string
 */
function lastDigit(n) {
  if (!n) {
    return "";
  }
  return n.toString().slice(-1);
}
