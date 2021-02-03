//import { showError } from "./dom";

const KELVIN = 273;
const KEY = '15b72f8181c849f71bb8b90b88730574';

export const getWeather = async (latitude, longitude, displayWeather, weather) => {
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
    displayWeather(weather);
  } catch (err) {
    console.log(err);
  }
};

export const getImagebyCity = async (city) => {
  const image = document.getElementById('imgURL');
  const apiURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=llFgOLuGurNxAhgZGUAW3Fuo4zM5O-Sv7Ws9h2sOa00`;
  try {
    const fetchData = await fectch(apiURL);
    const dataCity = await fetchRequest.json();
    const cityImageURL = dataCity.results[0].urls.full;
    image.src = cityImageURL;
    console.log(cityImageURL);
  } catch (err) {
    console.log(err);
  }
}