window.addEventListener('load', start);

function start() {
  console.log('Aula 8');
  console.log('Página Totalmente carregada');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  console.log(event);
  var count = event.target.value.length;
  var span = document.querySelector('#nameLength');
  span.textContent = count;
}

function preventSubmit(event) {
  event.preventDefault();
  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' cadsatrado com sucesso!');
}
