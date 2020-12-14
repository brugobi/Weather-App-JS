// show error if there is issue with geolocation
const showError = (error) => {
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

export default showError;
