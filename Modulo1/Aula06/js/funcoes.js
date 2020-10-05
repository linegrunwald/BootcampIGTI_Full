function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));

function compareNumbers(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
}

console.log(compareNumbers(5, 5));
console.log(compareNumbers(5, 2));
console.log(compareNumbers(2, 5));

function somatorio(from, upTo) {
  var sum = 0;
  for (var i = from; i <= upTo; i++) {
    sum += i;
  }

  return sum;
}

console.log(somatorio(1, 10));
console.log(somatorio(9, 100));
console.log(somatorio(200, 1000));
