const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");
const list = document.querySelector(".suggestions");

const updateUI = (data) => {
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
  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");

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

// const searchBox = cityForm.city;
// const suggestions = [];
// searchBox.addEventListener("keyup", (search) => {
//   if (!search.target.value.trim()) {
//     list.innerHTML = "";
//   }

//   autoComplete(search.target.value).then((data) => {
//     for (i = 0; i < 5; i++) {
//       suggestions.push({ town: data[i].town, city: data[i].city, country: data[i].country, key: data[i].key });

//       // console.log(data);
//     }

//     list.innerHTML = `
//       <a class="list-group-item list-group-item-action 0">
//       ${suggestions[0].town} <br />
//       ${suggestions[0].city} <br />
//       ${suggestions[0].country}
//     </a>
//     <a class="list-group-item list-group-item-action 1">
//     ${suggestions[1].town} <br />
//     ${suggestions[1].city} <br />
//     ${suggestions[1].country}
//   </a>
//   <a class="list-group-item list-group-item-action 2">
//   ${suggestions[2].town} <br />
//   ${suggestions[2].city} <br />
//   ${suggestions[2].country}
// </a>
// <a class="list-group-item list-group-item-action 3">
// ${suggestions[3].town} <br />
// ${suggestions[3].city} <br />
// ${suggestions[3].country}
// </a>
// <a class="list-group-item list-group-item-action 4">
// ${suggestions[4].town} <br />
// ${suggestions[4].city} <br />
// ${suggestions[4].country}
// </a>
//       `;
//   });
// });

// list.addEventListener("click", (e) => {
//   for (i = 0; i < 5; i++) {
//     if (e.target.classList.contains(i)) {
//       console.log(suggestions[i].key);
//     }
//   }
// });
