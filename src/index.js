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
const tempCelsius = document.querySelector('tem-celsius');
const location = document.querySelector('location');

// app data
const weather = {};
weather.temperature = {
  unit: "celsius"
}

// app const
const KELVIN = 273;
// api key
const KEY = '----';
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
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid-${KEY}`;
  console.log(api);
}