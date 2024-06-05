const apiKey = '48b153121aff5783ad362dc67ad486b2';

const getWeatherData = (location, callback) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching weather data:', error));
};

const displayWeatherData = (location, data) => {
  const weatherDetails = document.getElementById('weather-details');
  const weatherIcon = getWeatherIcon(data.weather[0].main);

  const weatherCard = `
    <div class="weather-card">
      <h2 class="text-xl font-bold mb-2">${location}</h2>
      <img src="${weatherIcon}" alt="${data.weather[0].description}" class="weather-icon mb-2">
      <p>Harorat: ${data.main.temp}°C</p>
      <p>Ob-havo holati: ${data.weather[0].description}</p>
    </div>
  `;

  weatherDetails.insertAdjacentHTML('beforeend', weatherCard);

  saveSearchHistory(location, data);
  displaySearchHistory();
};

const getWeatherIcon = (weather) => {
  switch (weather) {
    case 'Clear':
      return 'https://img.icons8.com/ios/452/sun--v1.png';
    case 'Clouds':
      return 'https://img.icons8.com/ios/452/cloud.png'; 
    case 'Rain':
      return 'https://img.icons8.com/ios/452/rain.png'; 
    case 'Snow':
      return 'https://img.icons8.com/ios/452/snow.png'; 
    default:
      return 'https://img.icons8.com/ios/452/partly-cloudy-day--v1.png'; 
  }
};

const saveSearchHistory = (location, data) => {
  let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  history.push({ location, data });
  localStorage.setItem('weatherHistory', JSON.stringify(history));
};

const displaySearchHistory = () => {
  const historyDetails = document.getElementById('history-details');
  historyDetails.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

  history.forEach(item => {
    const weatherIcon = getWeatherIcon(item.data.weather[0].main);
    const historyCard = `
      <div class="weather-card">
        <h2 class="text-xl font-bold mb-2">${item.location}</h2>
        <img src="${weatherIcon}" alt="${item.data.weather[0].description}" class="weather-icon mb-2">
        <p>Harorat: ${item.data.main.temp}°C</p>
        <p>Ob-havo holati: ${item.data.weather[0].description}</p>
      </div>
    `;

    historyDetails.insertAdjacentHTML('beforeend', historyCard);
  });
};

const handleSearch = () => {
  const location = document.getElementById('search-input').value.trim();
  if (location !== '') {
    getWeatherData(location, data => displayWeatherData(location, data));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  displaySearchHistory();
  document.getElementById('search-button').addEventListener('click', handleSearch);
  document.getElementById('search-input').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
});
