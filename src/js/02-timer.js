import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  inputDate: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

ref.btnStart.disabled = true;
let delta;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.warning('Please choose a date in the future');
      return;
    }
    ref.btnStart.disabled = false;
    ref.btnStart.addEventListener('click', startOnClick);

    function startOnClick() {
      const timerId = setInterval(() => {
        ref.inputDate.disabled = true;
        delta = selectedDates[0].getTime() - Date.now();
        const { days, hours, minutes, seconds } = convertMs(delta);
        ref.daysLeft.textContent = `${days}`;
        ref.hoursLeft.textContent = `${hours}`;
        ref.minutesLeft.textContent = `${minutes}`;
        ref.secondsLeft.textContent = `${seconds}`;
        if (delta < 1000) {
          clearInterval(timerId);
        }
      }, 1000);
    }
  },
};

flatpickr(ref.inputDate, options);

function pad(val) {
  return String(val).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
