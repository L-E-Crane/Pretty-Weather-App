let now = new Date();
function formatDateTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateTimeFormat = `${weekday} ${hour}:${minutes}`;
  return dateTimeFormat;
}

let dateTimeDisplay = document.querySelector("#date-time");
dateTimeDisplay.innerHTML = formatDateTime();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let searchedCity = response.data.name;
  let windspeed = response.data.wind.speed;
  let currentIcon = document.querySelector("#current-icon");
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherDescription = document.querySelector("#current-description");
  let currentWindspeed = document.querySelector("#current-windspeed");

  celsiusTemperature = Math.round(response.data.main.temp);

  currentCity.innerHTML = searchedCity;
  currentTemperature.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = description;
  currentWindspeed.innerHTML = `Wind: ${windspeed} km/h`;
  currentIcon.setAttribute(
    "src",
    `media/weathericons/${response.data.weather[0].icon}.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}

function citySearch(city) {
  let apiKey = `bb0df6985c2eab6a171d64a6bacbb4e1`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function submitSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  citySearch(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

////////
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

citySearch("Portland");
