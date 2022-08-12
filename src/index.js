// - import - //

import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// --- Country selection --- //

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfoBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onInputFetch, DEBOUNCE_DELAY));

function onInputFetch(e) {
  const value = e.target.value.trim();
  if (!value) {
    countryList.innerHTML = '';
    countryInfoBox.innerHTML = '';
    return;
  }

  fetchCountries(value)
    .then(response => {
      countryList.innerHTML = '';
      countryInfoBox.innerHTML = '';

      if (response > 10)
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      if (response.length >= 2 && response.length <= 10) {
        countryList.innerHTML = renderCountriesList(response);
      }
      if (response.length === 1) {
        countryList.innerHTML = '';
        countryList.insertAdjacentHTML(
          'beforeend',
          renderCountriesList(response)
        );
        countryInfoBox.insertAdjacentHTML(
          'beforeend',
          renderCountryInfo(response)
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

// --- Create Card Country List --- //

function createCountryList({ name, flags }) {
  return `<li class="country-list__item">
      <img class="country-list__img" src="${flags.svg}" alt="${name.official}" width="70" />
      <h2 class="country-list__name">${name.common}</h2>
    </li>`;
}

function renderCountriesList(array) {
  return array.reduce((acc, list) => acc + createCountryList(list), '');
}

function renderCountryInfo(country) {
  return country.map(({ capital, population, languages }) => {
    return `
      <div>
        <ul class="country-info__list">
          <li class="country-info__item">
              <b class = "country-info__capital">Capital:</b> ${capital}</li>
          <li class="country-info__item">
              <b class = "country-info__population">Population:</b> ${population.toLocaleString()}</li>
          <li class="country-info__item">
              <b class = "country-info__langs">Languages:</b> ${Object.values(
                languages
              ).join(', ')}</li>
        </ul>
      </div>
        `;
  });
}
