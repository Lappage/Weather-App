const key = "4fx4ZtXzrCyaJ7H33USQmUanSARbUo3B";

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};

const getConditions = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

getConditions(329260);

getCity("manchester")
  .then((data) => {
    return data[0].Key;
  })
  .catch((error) => {
    console.log(error);
  });
