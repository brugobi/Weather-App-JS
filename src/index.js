import './styles.scss';
import celsiusToFahrenheit from './functions';
import showError from './dom';
import { getWeather } from './api';
import { displayWeather } from './dom';


const inputCity = document.getElementById('address-input');

// app data
const weather = {};
weather.temperature = {
  unit: false,
};

// user getCurrentPosition
const setPosition = (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  getWeather(latitude, longitude, displayWeather, weather);
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
  getWeather(e.suggestion.latlng.lat, e.suggestion.latlng.lng, displayWeather, weather);
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
