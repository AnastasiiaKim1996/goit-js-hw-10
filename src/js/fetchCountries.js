const BASE_URL = 'https://restcountries.com/v3.1';
const paramsFilter = 'name,capital,flags,languages,population';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=${paramsFilter}`).then(
    response => {
      if (!response.ok) {
        throw new Error(`404 not found: ${response.statusText}`);
      }
      return response.json();
    }
  );
}
