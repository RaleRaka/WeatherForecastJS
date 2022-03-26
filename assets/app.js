const submitBtn = document.querySelector('.weather-wrapper_submit-btn');
const temperatureData = document.querySelector(
  '.weather-data-wrapper__forecast-temp'
);
const descriptionData = document.querySelector(
  '.weather-data-wrapper__forecast-desc'
);
const locationData = document.querySelector(
  '.weather-data-wrapper__forecast-location'
);
const iconData = document.querySelector('.weather-data-wrapper__weather-image');
const locationInput = document.querySelector(
  '.weather-data-wrapper__location-input'
);

const API_URL = 'http://api.weatherstack.com/current';
const API_KEY = 'f79e336af8c33e8c4ec5e4630227b402';

const getWeatherData = async city => {
  const url = `${API_URL}?access_key=${API_KEY}&query=${city}`;
  const response = await fetch(url);
  //console.log(response);
  const weatherData = await response.json();
  //   console.log(weatherData);

  if (weatherData.success === false) {
    alert(weatherData.error.info);
    return;
  }

  const {
    temperature,
    weather_descriptions,
    weather_icons,
  } = weatherData.current;
  const { country, name, region } = weatherData.location;

  temperatureData.textContent = `${temperature} °C`;
  descriptionData.textContent = `${weather_descriptions[0]}`;
  iconData.src = weather_icons[0];
  locationData.textContent = `${name} (${region},${country}) `;
};

locationInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    const inputValue = locationInput.value;
    getWeatherData(inputValue);
  }
});

submitBtn.addEventListener('click', () => {
  const inputValue = locationInput.value;
  getWeatherData(inputValue);
});
