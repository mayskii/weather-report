'use strict';

const state = {
  temp: 70,
  tempEl: null,
  tempUpEl: null,
  tempDownEl: null,
  landscapeEl: null,
  cityNameInput: null,
  headerCityNameEl: null,
  resetCityBtn: null,
  currentTempBtn: null,
  skySelector: null,
  skyEl: null,
  unitBtn: null,
  isFahrenheit: true,

};


const loadControls = () => {
  state.tempEl = document.getElementById('tempValue');
  state.tempUpEl = document.getElementById('increaseTempControl');
  state.tempDownEl = document.getElementById('decreaseTempControl');
  state.landscapeEl = document.getElementById('landscape');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.headerCityNameEl = document.getElementById('headerCityName');
  state.resetCityBtn = document.getElementById('cityNameReset');
  state.currentTempBtn = document.getElementById('currentTempButton');
  state.skySelector = document.getElementById('skySelect');
  state.skyEl = document.getElementById('sky');
  state.gardenContent = document.getElementById('gardenContent');
  state.unitBtn = document.getElementById('toggleUnitBtn');
};

const updateTempColor = (temp) => {

  state.tempEl.className = '';
  if (temp >= 80) state.tempEl.classList.add('red');
  else if (temp >= 70) state.tempEl.classList.add('orange');
  else if (temp >= 60) state.tempEl.classList.add('yellow');
  else if (temp >= 50) state.tempEl.classList.add('green');
  else state.tempEl.classList.add('teal');
};

const updateLandscape = (temp) => {

  if (temp >= 80) state.landscapeEl.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  else if (temp >= 70) state.landscapeEl.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  else if (temp >= 60) state.landscapeEl.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  else state.landscapeEl.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
};

const updateSky = () => {
  const selection = state.skySelector.value;

  if (selection === 'Sunny') state.skyEl.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  else if (selection === 'Cloudy') state.skyEl.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  else if (selection === 'Rainy') state.skyEl.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  else if (selection === 'Snowy') state.skyEl.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';

  state.gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

  if (selection === 'Sunny') state.gardenContent.classList.add('sunny');
  else if (selection === 'Cloudy') state.gardenContent.classList.add('cloudy');
  else if (selection === 'Rainy') state.gardenContent.classList.add('rainy');
  else if (selection === 'Snowy') state.gardenContent.classList.add('snowy');

};

const updateUI = () => {
  state.tempEl.textContent = state.temp;
  updateTempColor(state.temp);
  updateLandscape(state.temp);
  state.headerCityNameEl.textContent = state.cityNameInput.value;
};

const increaseTemp = () => {
  state.temp++;
  updateUI();
};

const decreaseTemp = () => {
  state.temp--;
  updateUI();
};

const resetCityName = () => {
  state.cityNameInput.value = 'Seattle';
  updateUI();
};

const getLanLon = (city) => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: city,
        format: 'json'
      }
    })
    .then((response) => {
      const location = response.data[0];
      const latitude = location.lat;
      const longitude = location.lon;

      return { latitude, longitude };
    })
    .catch((err) => {
      console.error(err);
    });
};

const getWeather = (latitude, longitude) => {
  return axios
    .get('http://127.0.0.1:5000/weather', { params: {lat: latitude, lon: longitude } })
    .then(response => {
      const kelvin = response.data.main.temp;
      const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32);
      return fahrenheit;
    });
};

const updateRealtimeTemp = () => {
  const city = state.cityNameInput.value;

  getLanLon(city)
    .then(({ latitude, longitude }) => getWeather(latitude, longitude))
    .then(temp => {
      state.temp = temp;
      updateUI();
      return temp;
    })
    .catch(err => console.log(err));
};

const toggleUnit = () => {
  state.isFahrenheit = !state.isFahrenheit;

  if(state.isFahrenheit) {
    state.temp = Math.round(state.temp * 9/5 + 32);
    state.unitBtn.textContent = '°F';
  } else {
    state.temp = Math.round((state.temp - 32) * 5/9);
    state.unitBtn.textContent = '°C';
  }

  updateUI();
};


const registerEvents = () => {
  state.cityNameInput.addEventListener('input', updateUI);
  state.resetCityBtn.addEventListener('click', resetCityName);
  state.tempUpEl.addEventListener('click', increaseTemp);
  state.tempDownEl.addEventListener('click', decreaseTemp);
  state.currentTempBtn.addEventListener('click', updateRealtimeTemp);
  state.skySelector.addEventListener('change', updateSky);
  state.unitBtn.addEventListener('click', toggleUnit);
};

const onload = () => {
  loadControls();
  updateUI();
  registerEvents();
  updateSky();
};

onload();
