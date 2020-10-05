var title = document.querySelector('h1');
title.textContent = 'Mudei';

var city = document.querySelector('#city');
city.textContent = 'São Bernardo do Campo';

var data = document.querySelectorAll('.data');
console.log(data);
personalDataArray = Array.from(data);
console.log(data);

for (var i = 0; i < data.length; i++) {
  var currentElement = data[i];
  currentElement.classList.add('emphasis');
}
