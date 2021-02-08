// import { showError } from "./dom";

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
    return data.name;
  } catch (err) {
    return Promise.reject(alert);
  }
};

// eslint-disable-next-line consistent-return
export const getImagebyCity = async (city) => {
  const { body } = document;

  const apiURL = `https://api.unsplash.com/photos/random?count=1&query=${city}&client_id=`;
  try {
    const fetchData = await fetch(apiURL);

    if (fetchData.status === 200) {
      const [{ urls: { regular } }] = await fetchData.json();

      body.style.background = `url(${regular}) center center / cover no-repeat`;
    }
  } catch (err) {
    return Promise.reject(alert);
  }
};