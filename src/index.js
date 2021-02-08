import './styles.scss';
import celsiusToFahrenheit from './functions';
import {
  getWeather,
  getImagebyCity,
} from './api';
import {
  displayWeather,
  showError,
} from './dom';

const inputCity = document.getElementById('address-input');

// app data
const weather = {};
weather.temperature = {
  unit: false,
};

// user getCurrentPosition
const setPosition = async (position) => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  const city = await getWeather(latitude, longitude, displayWeather, weather);
  if (city) {
    getImagebyCity(city);
  }
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

placesAutocomplete.on('change', async (e) => {
  const city = await getWeather(e.suggestion.latlng.lat, e.suggestion.latlng.lng, displayWeather, weather);
  if (city) {
    getImagebyCity(city);
  }
});
// end algolia

const btnLocaltion = document.querySelector('.btnLocation');
btnLocaltion.addEventListener('click', () => {
  // check browser support geolocation
  if ('geolocation' in navigator) {
    const geoLocation = navigator.geolocation.getCurrentPosition(setPosition, showError);
    console.log(geoLocation);
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
