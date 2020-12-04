import './styles.scss';

// //api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
// const api = {
//   key: config.MY_KEY,
//   url: "api.openweathermap.org/data/2.5/"
// };

//get the elements
const weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".description");
const notification = document.querySelector('.notification');
const tempCelsius = document.querySelector('.temp-celsius');
const location = document.querySelector('.location');
const tempFahrenheit = document.querySelector('.temp-fahrenheit');

// app data
const weather = {};
weather.temperature = {
  unit: "celsius"
}

// app const
const KELVIN = 273;
// api key
const KEY = '--';
//const myKey = config.MY_KEY;

// check browser support geolocation
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.style.display = "block";
  notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

// user getCurrentPosition
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// show error if there is issue with geolocation
function showError(error) {
  notification.style.display = "block";
  notification.innerHTML = `<p> ${error.message}</p>`;
}

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
} 
//display weather
function displayWeather() {
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png">`;
  tempCelsius.innerHTML = `${weather.temperature.value}°C`;
  tempFahrenheit.innerHTML = `${celsiusToFahrenheit(weather.temperature.value)}°F`;
  weatherDescription.innerHTML = weather.description;
  location.innerHTML = `${weather.city},${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * (9 / 5)) + 32;
}

//when the user clicks on the temperature elements
