'use strict';

const state = {
  cityNameInput: null,
  headerCityNameEl: null,
  resetCityBtn: null,

};

const loadControls = () => {
  state.cityNameInput = document.getElementById('cityNameInput');
  state.headerCityNameEl = document.getElementById('headerCityName');
  state.resetCityBtn = document.getElementById('cityNameReset');
};

const updateCityName = () => {
  state.headerCityNameEl.textContent = state.cityNameInput.value;
};

const resetCityName = () => {
  state.cityNameInput.value = 'Seattle';
  updateCityName();
};


const registerEvents = () => {
  state.cityNameInput.addEventListener('input', updateCityName);
  state.resetCityBtn.addEventListener('click', resetCityName);

};

const onload = () => {
  loadControls();
  registerEvents();
  updateCityName();
};

onload();