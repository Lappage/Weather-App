const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // const cityData = data.cityData;
  // const weather = data.weather;

  // destructured properties
  const { cityData, weather } = data;

  //update details template

  details.innerHTML = `
  <h5 class="my-3">${cityData.EnglishName}</h5>
  <div class="mt-3 mb-5">${cityData.Country.EnglishName}</div>
  <h6 class="my-3">${weather.WeatherText}</h6>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  //show the Card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  // update the images

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

  icon.setAttribute("src", iconSrc);
};

cityForm.city.focus(); // focus the text box

const updateCity = async (city) => {
  const cityData = await getCity(city);
  const weather = await getWeather(cityData.Key);

  return {
    cityData,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stops the page from refreshing on submit (default browser action)

  // get city value from form
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update ui with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => {
      alert("Unable to fetch data :(");
    });
});
