var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

function getLotteryNumbers() {
  var numbers = [];
  while (numbers.length < 6) {
    var number = getRandomNumber();
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers.sort(function (a, b) {
    return a - b;
  });
}

function getRandomNumber() {
  return Math.max(1, Math.ceil(Math.random() * 60));
}

app.get('/', function (request, response) {
  var numbers = getLotteryNumbers();
  response.json({ numbers: numbers });
});

app.listen(3001, function () {
  console.log('Servidor iniciado na porta 3001');
});
