// get the elements
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.description');
const tempCelsius = document.querySelector('.temp-celsius');
const tempMin = document.getElementById('temMin');
const tempMax = document.getElementById('temMax');
const location = document.querySelector('.location');
const todayDate = document.getElementById('todayDate');

export const displayWeather = (weather) => {
  weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@2x.png">`;
  tempCelsius.innerHTML = `${weather.temp}°C`;
  tempMin.innerHTML = `${weather.temp_min}|`;
  tempMax.innerHTML = `${weather.temp_max}`;
  weatherDescription.innerHTML = weather.description;
  location.innerHTML = `${weather.city},${weather.country}`;
  todayDate.innerHTML = `${new Date().toDateString()}`;
};

export const showError = (error) => {
  const errorContainer = document.getElementById('errorContainer');
  const notificationDiv = document.createElement('div');
  notificationDiv.classList.add('columns');
  errorContainer.prepend(notificationDiv);
  const notification = document.createElement('div');
  notification.classList.add('notification', 'is-12');
  notificationDiv.appendChild(notification);
  notification.style.display = 'block';
  notification.innerHTML = `<p> ${error.message}</p>`;
};
