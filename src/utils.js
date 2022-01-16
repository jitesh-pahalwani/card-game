/* A method to randomly shuffle all elements of an array */
export function shuffleArrayElements(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
  }
  return array;
}

/* A method to generate random pair of specified count of numbers (withing a range) in an array */
export function generateRandomNumberPairs(numberOfPairs, rangeFrom, rangeTo) {
  let resultArray = [];

  for (var i = 0; i < numberOfPairs; i++) {
    let randomNumber = Math.floor(Math.random() * (rangeTo - rangeFrom) + rangeFrom);
    while (resultArray.indexOf(randomNumber) !== -1) {
      randomNumber = Math.floor(Math.random() * (rangeTo - rangeFrom) + rangeFrom);
    }
    resultArray.push(randomNumber);
  }

  return resultArray.concat(resultArray);
}