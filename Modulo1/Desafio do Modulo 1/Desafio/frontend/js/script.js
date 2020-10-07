'use strict';

let spinnerLoading = null;
let divPeople = null;
let divEstatisticas = null;
let buttonBusca = null;
let inputName = null;

let allPeople = [];
let filteredPeople = [];
let currentFilter = '';
let totalPeople = 0;

let totalFeminino = 0;
let totalMesculino = 0;

let somaIdade = 0;
let mediaIdade = 0;

let numberFormat = Intl.NumberFormat('pt-BR');

window.addEventListener('load', async () => {
  await fetchPeople();

  mapElements();
  addEvents();
  enableControls();
});

async function fetchPeople() {
  const res = await fetch('http://localhost:3002/people');
  const json = await res.json();
  allPeople = json.map(({ login, name, picture, dob, gender }) => {
    const { first, last } = name;
    return {
      id: login.uuid,
      name: `${first} ${last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender,
    };
  });
  sortName(allPeople);
}

const mapElements = () => {
  divPeople = document.querySelector('#divPeople');
  divEstatisticas = document.querySelector('#divEstatisticas');
  buttonBusca = document.querySelector('#buttonBusca');
  inputName = document.querySelector('#inputName');
  spinnerLoading = document.querySelector('#spinnerLoading');
};

const addEvents = () => {
  buttonBusca.addEventListener('click', handleButtonClick);
  inputName.addEventListener('keyup', handleTyping);
};

const enableControls = () => {
  setTimeout(() => {
    inputName.disabled = false;
    inputName.focus();

    spinnerLoading.classList.add('hidden');
  }, 1000);
};

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
  let replaceCurrent = new RegExp(`(${currentFilter.trim()})`, 'gi');
  totalPeople = filteredPeople.length;
  let peopleHTML = `
  <div>
    <h4> ${formatNumber(totalPeople)} usuário(s) encontrado(s)</h4>
  `;
  filteredPeople.forEach((person) => {
    const { picture, id, name, age } = person;

    const personHTML = `
    <div class='person'>
      <div>
        <img src="${picture}" alt="${id}">
      </div>
      <div>
        <spam>${name.replace(
          replaceCurrent,
          '<spam style="background-color: khaki">$1</spam>'
        )},</sapm>
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
    mediaIdade = (somaIdade / filteredPeople.length || 0).toFixed(2);
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
        <li><strong>Sexo masculino:</strong> ${formatNumber(
          totalMesculino
        )}</li> 
        <li><strong>Sexo feminino:</strong> ${formatNumber(totalFeminino)}</li> 
        <li><strong>Soma idades:</strong> ${formatNumber(somaIdade)}</li> 
        <li><strong>Média Idades:</strong> ${formatNumber(mediaIdade)}</li> 
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
