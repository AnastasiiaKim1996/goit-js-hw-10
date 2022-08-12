const fetchCountries = name => {
  const BASE_URL = `https://restcountries.com/v3.1/name/${name}`;
  const params = `?fields=name,capital,population,flags,languages`;
  const URL = `${BASE_URL}${params}`;

  return fetch(URL).then(res => {
    if (!res.ok) {
      throw new Error(`404 not found: ${res.statusText}`);
    }

    return res.json();
  });
};

export { fetchCountries };
