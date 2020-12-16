import './styles.scss';
import celsiusToFahrenheit from './functions';
import showError from './dom';

// get the elements
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.description');
const tempCelsius = document.querySelector('.temp-celsius');
const tempMin = document.getElementById('temMin');
const tempMax = document.getElementById('temMax');
const location = document.querySelector('.location');
const todayDate = document.getElementById('todayDate');
const inputCity = document.getElementById('address-input');

// app data
const weather = {};
weather.temperature = {
  unit: false,
};

const KELVIN = 273;
const KEY = '15b72f8181c849f71bb8b90b88730574';

const displayWeather = () => {
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@2x.png">`;
  tempCelsius.innerHTML = `${weather.temp}°C`;
  tempMin.innerHTML = `${weather.temp_min}|`;
  tempMax.innerHTML = `${weather.temp_max}`;
  weatherDescription.innerHTML = weather.description;
  location.innerHTML = `${weather.city},${weather.country}`;
  todayDate.innerHTML = `${new Date().toDateString()}`;
};

const getWeather = async (latitude, longitude) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
  try {
    const fetchRequest = await fetch(api);
    const data = await fetchRequest.json();
    weather.temp = Math.floor(data.main.temp - KELVIN);
    weather.temp_min = Math.floor(data.main.temp_min - KELVIN);
    weather.temp_max = Math.floor(data.main.temp_max - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    displayWeather();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

// user getCurrentPosition
const setPosition = (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  getWeather(latitude, longitude);
};

// algolia autocomplete
const places = require('places.js');

const options = {
  type: 'city',
};

const placesAutocomplete = places({
  appId: 'pl8ECVGE7327',
  apiKey: 'de5a29b0a079311267e271c58510347c',
  container: inputCity,
}).configure(options);

placesAutocomplete.on('change', (e) => {
  getWeather(e.suggestion.latlng.lat, e.suggestion.latlng.lng);
});
// end algolia

const btnLocaltion = document.querySelector('.btnLocation');
btnLocaltion.addEventListener('click', () => {
  // check browser support geolocation
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    // eslint-disable-next-line no-undef
    notification.style.display = 'block';
    // eslint-disable-next-line no-undef
    notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
  }
});

const ChangeTheUnitofTemperature = () => {
  if (!weather.temperature.unit) {
    weather.temperature.unit = true;
    document.getElementById('btnTemp').innerHTML = `${celsiusToFahrenheit(weather.temp)}°F`;
    document.getElementById('temMin').innerHTML = `${celsiusToFahrenheit(weather.temp_min)}|`;
    document.getElementById('temMax').innerHTML = `${celsiusToFahrenheit(weather.temp_max)}`;
  } else {
    weather.temperature.unit = false;
    document.getElementById('btnTemp').innerHTML = `${weather.temp}°C`;
    document.getElementById('temMin').innerHTML = `${weather.temp_min}|`;
    document.getElementById('temMax').innerHTML = `${weather.temp_max}`;
  }
};

const btnTemp = document.getElementById('btnTemp');
btnTemp.addEventListener('click', () => {
  ChangeTheUnitofTemperature();
});
