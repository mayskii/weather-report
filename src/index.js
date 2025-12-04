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
};


const loadControls = () => {
  state.tempEl = document.getElementById('tempValue');
  state.tempUpEl = document.getElementById('increaseTempControl');
  state.tempDownEl = document.getElementById('decreaseTempControl');
  state.landscapeEl = document.getElementById('landscape');
  state.cityNameInput = document.getElementById('cityNameInput');
  state.headerCityNameEl = document.getElementById('headerCityName');
  state.resetCityBtn = document.getElementById('cityNameReset');
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

const registerEvents = () => {
  state.cityNameInput.addEventListener('input', updateUI);
  state.resetCityBtn.addEventListener('click', resetCityName);
  state.tempUpEl.addEventListener('click', increaseTemp);
  state.tempDownEl.addEventListener('click', decreaseTemp);
};

const onload = () => {
  loadControls();
  updateUI();
  registerEvents();
};

onload();
