'use strict';

window.addEventListener('load', () => {
  doFetch();
  doFetchAsync();

  divisionPromisse(12, 6)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão: ${errorMessage}`);
    });

  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

const doFetch = () => {
  fetch('http://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisição');
    });
};

const showData = (data) => {
  const user = document.querySelector('#user');
  user.textContent = `${data.login} ${data.name}`;
};

async function doFetchAsync() {
  const res = await fetch('http://api.github.com/users/rrgomide');
  const json = await res.json();
  console.log(json);
}

const divisionPromisse = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possivel dividir por 0');
    }

    resolve(a / b);
  });
};

function executeDivisionPromise() {
  divisionPromisse(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log(`Falha na divisão: ${errorMessage}`);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromisse(12, 2);
  console.log(division);
}
