import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfoBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', debounce(onInputFetch, DEBOUNCE_DELAY));

function onInputFetch(e) {
  fetchCountries(e.target.value)
    .then(response => {
      if (response > 10)
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
    })
    .catch(error => console.log(error));
}
