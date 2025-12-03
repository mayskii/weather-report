'use strict';

const tempEl = document.getElementById('tempValue');
const tempUpEl = document.getElementById('increaseTempControl');
const tempDownEl = document.getElementById('decreaseTempControl');
let landscapeEl = document.getElementById('landscape');

const updateTempColorAndLandscape = (temp) => {

  if (temp >= 80) {
    tempEl.className = 'red';
    landscapeEl.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (temp >= 70) {
    tempEl.className = 'orange';
    landscapeEl.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (temp >= 60) {
    tempEl.className = 'yellow';
    landscapeEl.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (temp >= 50) {
    tempEl.className = 'green';
    landscapeEl.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    tempEl.className = 'teal';
    landscapeEl.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }
  tempEl.textContent = temp;
};

updateTempColorAndLandscape(70);


tempUpEl.addEventListener('click', () => {
  let tempValue = parseInt(tempEl.textContent);
  tempValue++;
  tempEl.textContent = tempValue;
  updateTempColorAndLandscape(tempValue);
});

tempDownEl.addEventListener('click', () => {
  let tempValue = parseInt(tempEl.textContent);
  tempValue--;
  tempEl.textContext = tempValue;
  updateTempColorAndLandscape(tempValue);
});