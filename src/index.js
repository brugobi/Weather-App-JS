import { data } from 'jquery';
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
const temperature = document.querySelector('.temperature');
const tempCelsius = document.querySelector('.temp-celsius');
const tempMin = document.getElementById("temMin");
const tempMax = document.getElementById("temMax");
const location = document.querySelector('.location');
const tempFahrenheit = document.querySelector('.temp-fahrenheit');

// app data
const weather = {};
weather.temperature = {
  unit: false
}

// app const
const KELVIN = 273;
// api key
const KEY = '---';
//const myKey = config.MY_KEY;

// user getCurrentPosition
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// show error if there is issue with geolocation
function showError(error) {
  notification.style.display = 'block';
  notification.innerHTML = `<p> ${error.message}</p>`;
}

// function getWeather(latitude, longitude) {
//   let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
//   console.log(api);
//   fetch(api)
//     .then(function (response) {
//       let data = response.json();
//       return data;
//     })
//     .then(function (data) {
//       weather.temperature.value = Math.floor(data.main.temp - KELVIN);
//       //weather.temperature2 = Math.floor(data.main.temp_min.value - KELVIN);
//       //console.log(weather.temperature2.value);
//       //weather.temperature_max.value = Math.floor(data.main.temp_max - KELVIN);
//       weather.description = data.weather[0].description;
//       weather.iconId = data.weather[0].icon;
//       weather.city = data.name;
//       weather.country = data.sys.country;
//     })
//     .then(function () {
//       displayWeather();
//     });
// }

const getWeather = async (latitude, longitude) => {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
  console.log(api);
  try {
    const fetchRequest = await fetch(api);
    const data = await fetchRequest.json();
    console.log(data);
    weather.temp = Math.floor(data.main.temp - KELVIN);
    weather.temp_min = Math.floor(data.main.temp_min - KELVIN);
    weather.temp_max = Math.floor(data.main.temp_max - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    console.log(weather);
    displayWeather();
  } catch (err) {
    console.log(err);
  }
}


// add the function to the button
let btnLocaltion = document.querySelector(".btnLocation");
btnLocaltion.addEventListener("click", function () {
  // check browser support geolocation
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notification.style.display = "block";
    notification.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
  }
});




//display weather
function displayWeather() {
  console.log(weather);
  weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png">`;
  tempCelsius.innerHTML = `${weather.temp}°C`;
  tempMin.innerHTML = `${weather.temp_min}|`;
  tempMax.innerHTML = `${weather.temp_max}`;
  weatherDescription.innerHTML = weather.description;
  location.innerHTML = `${weather.city},${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return Math.floor(temperature * (9 / 5)) + 32;
}

// toggle button to switch between C and F unit
function ChangeTheUnitofTemperature() {
  if (!weather.temperature.unit) {
    weather.temperature.unit = true;
    document.getElementById("btnTemp").innerHTML = `${celsiusToFahrenheit(weather.temp)}°F`;
    document.getElementById("temMin").innerHTML = `${celsiusToFahrenheit(weather.temp_min)}|`;
    document.getElementById("temMax").innerHTML = `${celsiusToFahrenheit(weather.temp_max)}`;
  } else {
    weather.temperature.unit = false;
    document.getElementById("btnTemp").innerHTML = `${weather.temp}°C`;
    document.getElementById("temMin").innerHTML = `${weather.temp_min}|`;
    document.getElementById("temMax").innerHTML = `${weather.temp_max}`;
  }
}

let btnTemp = document.getElementById("btnTemp");
btnTemp.addEventListener("click", function () {
  ChangeTheUnitofTemperature();
});
