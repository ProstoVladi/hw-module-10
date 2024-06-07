import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timerDays = document.querySelector('.js-date-days');
const timerHours = document.querySelector('.js-date-hours');
const timerMinutes = document.querySelector('.js-date-minutes');
const timerSeconds = document.querySelector('.js-date-seconds');
const btnStart = document.querySelector('.js-btn-start');
const calendar = document.querySelector('#datetime-picker');

btnStart.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Number(selectedDates[0]) < Date.now()) {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function onClick() {
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const calendarDate = new Date(calendar.value);
    const timerDate = calendarDate - currentDate;

    if (timerDate <= 1) {
      clearInterval(intervalId);
    } else {
      const convertDays = convertMs(timerDate).days;
      const convertHours = convertMs(timerDate).hours;
      const convertMinutes = convertMs(timerDate).minutes;
      const convertSeconds = convertMs(timerDate).seconds;

      timerDays.textContent = addLeadingZero(convertDays);
      timerHours.textContent = addLeadingZero(convertHours);
      timerMinutes.textContent = addLeadingZero(convertMinutes);
      timerSeconds.textContent = addLeadingZero(convertSeconds);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
