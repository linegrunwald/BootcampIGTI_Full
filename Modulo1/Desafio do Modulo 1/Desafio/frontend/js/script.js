'use strict';

let divPeople = null;
let divEstatisticas = null;
let buttonBusca = null;
let inputName = null;

let numberFormat = null;

let allPeople = [];
let filteredPeople = [];
let currentFilter = '';
let totalPeople = 0;

let totalFeminino = 0;
let totalMesculino = 0;

let somaIdade = 0;
let mediaIdade = 0;

window.addEventListener('load', () => {
  divPeople = document.querySelector('#divPeople');
  divEstatisticas = document.querySelector('#divEstatisticas');
  buttonBusca = document.querySelector('#buttonBusca');
  inputName = document.querySelector('#inputName');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchPeople();
});

async function fetchPeople() {
  const res = await fetch('http://localhost:3002/');
  const json = await res.json();
  allPeople = json.results.map((person) => {
    const { name, picture, dob, gender } = person;
    return {
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });

  buttonBusca.addEventListener('click', handleButtonClick);
  inputName.addEventListener('keyup', handleTyping);
}

const handleButtonClick = () => {
  filteredPeople = allPeople.filter((person) =>
    person.name
      .toLocaleLowerCase()
      .trim()
      .includes(currentFilter.toLocaleLowerCase().trim())
  );

  sortName(filteredPeople);
  renderListaPerson();
  renderEstatisticas();
};

const handleTyping = (event) => {
  currentFilter = inputName.value;
  if (event.key === 'Enter') {
    event.preventDefault();
    buttonBusca.click();
  } else if (currentFilter) {
    buttonBusca.disabled = false;
  } else {
    buttonBusca.disabled = true;
  }
};

const renderListaPerson = () => {
  let replaceCurrent = new RegExp(`(${currentFilter})`, 'gi');
  let peopleHTML = `
  <div>
    <h4> ${formatNumber(filteredPeople.length)} usuário(s) encontrado(s)</h4>
  `;
  filteredPeople.forEach((person) => {
    const { picture, name, age } = person;

    const personHTML = `
    <div class='person'>
      <div>
        <img src="${picture}" alt="${name}">
      </div>
      <div>
        <spam>${name.replace(
          replaceCurrent,
          '<spam style="background-color: khaki">$1</spam>'
        )},</sapm>
      </div>
      <div>
        <spam>${age} anos</sapm>
      </div>
    </div>
  `;
    peopleHTML += personHTML;
  });

  peopleHTML += '</div>';
  divPeople.innerHTML = peopleHTML;
};

const renderEstatisticas = () => {
  let estatisticasHTML = '';
  if (filteredPeople.length) {
    somaIdade = filteredPeople.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);
    mediaIdade = somaIdade / filteredPeople.length;
    totalFeminino = filteredPeople.filter((person) => {
      return person.gender === 'female';
    }).length;
    totalMesculino = filteredPeople.filter((person) => {
      return person.gender === 'male';
    }).length;

    estatisticasHTML = `
    <div>
      <h4>Estatísticas:</h4>
      <ul>
        <li><strong>Sexo masculino:</strong> ${totalMesculino}</li> 
        <li><strong>Sexo feminino:</strong> ${totalFeminino}</li> 
        <li><strong>Some idades:</strong> ${somaIdade}</li> 
        <li><strong>Média Idades:</strong> ${mediaIdade}</li> 
      </ul>
    </div>
  `;
  } else {
    estatisticasHTML = '<h4>Nada a ser exibido</h4>';
  }

  divEstatisticas.innerHTML = estatisticasHTML;
};
const formatNumber = (number) => {
  return numberFormat.format(number);
};

const sortName = (lista) => {
  lista.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};
