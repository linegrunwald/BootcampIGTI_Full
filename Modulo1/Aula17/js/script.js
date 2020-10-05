'use strict';
/* Estado da aplicação (state)*/
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;

    return {
      id: numericCode,
      name: translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });
  sortName(allCountries);
  render();
}

const render = () => {
  renderCoutryList();
  renderFavorites();
  renderSumary();

  handleCoutryButtons();
};

const sortName = (lista) => {
  lista.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

const renderCoutryList = () => {
  let countriesHTML = '<div>';
  allCountries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const countriyHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li> 
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>
  `;

    countriesHTML += countriyHTML;
  });

  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
};

const renderFavorites = () => {
  let favoritesHTML = '<div>';
  favoriteCountries.forEach((favorite) => {
    const { name, flag, id, formattedPopulation } = favorite;

    const favoriteHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li> 
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>
  `;

    favoritesHTML += favoriteHTML;
  });

  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
};
const renderSumary = () => {
  countCountries.textContent = formatNumber(allCountries.length);
  countFavorites.textContent = formatNumber(favoriteCountries.length);

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);
  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
};

const handleCoutryButtons = () => {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favotiteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favotiteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
};

const addToFavorites = (id) => {
  const countryToAdd = allCountries.find((button) => button.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];
  sortName(favoriteCountries);

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
};

const removeFromFavorites = (id) => {
  const countryToRemove = favoriteCountries.find((button) => button.id === id);

  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);

  allCountries = [...allCountries, countryToRemove];
  sortName(allCountries);

  render();
};

const formatNumber = (number) => {
  return numberFormat.format(number);
};
