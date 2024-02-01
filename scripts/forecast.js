const key = "	V7DfOSjg3TGUqWSF4fzTHkoadiBSwpPZ";
let id;
let city;

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const autoComplete = async (q) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  const query = `?apikey=${key}&q=${q}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data.map((item) => {
    return {
      town: item.LocalizedName,
      city: item.AdministrativeArea.LocalizedName,
      country: item.Country.LocalizedName,
      key: item.Key,
    };
  });
};
