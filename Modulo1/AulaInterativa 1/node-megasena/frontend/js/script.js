//window.addEventListener('load', start);

function start() {
  const button = document.querySelector('#buttonGenerate');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const div = document.querySelector('#numbers');
  div.innerHTML = '';

  fetch('http://localhost:3001').then(function (resource) {
    return resource.json().then(function (json) {
      const span = document.createElement('span');
      span.textContent = JSON.stringify(json.numbers);
      div.appendChild(span);
    });
  });
}

start();
