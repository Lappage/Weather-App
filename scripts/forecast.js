class Forecast {
  constructor() {
    this.key = "AT354yIURGCDwk55dBmB97EbtIutKetd";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityData = await this.getCity(city);
    const weather = await this.getWeather(cityData.Key);

    return {
      cityData,
      weather,
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}

// const autoComplete = async (q) => {
//   const base = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
//   const query = `?apikey=${key}&q=${q}`;

//   const response = await fetch(base + query);
//   const data = await response.json();

//   return data.map((item) => {
//     return {
//       town: item.LocalizedName,
//       city: item.AdministrativeArea.LocalizedName,
//       country: item.Country.LocalizedName,
//       key: item.Key,
//     };
//   });
// };
