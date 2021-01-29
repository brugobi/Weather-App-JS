const KELVIN = 273;
const KEY = '15b72f8181c849f71bb8b90b88730574';

export const getWeather = async (latitude, longitude, displayWeather, weather, showError, err) => {
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
  } catch {
    showError(err);
  }
};