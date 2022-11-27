import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
  dateTimePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    }

    refs.startBtn.removeAttribute('disabled');

    console.log(selectedDates[0].getTime());
  },
};

flatpickr('input#datetime-picker', options);

let dateTime = refs.dateTimePicker._flatpickr.selectedDates[0].getTime();

refs.days.textContent = convertMs(dateTime).days;
refs.hours.textContent = convertMs(dateTime).hours;
refs.minutes.textContent = convertMs(dateTime).minutes;
refs.seconds.textContent = convertMs(dateTime).seconds;

function addLeadingZero(value) {}

// ----------TIME CONVERT------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
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

// console.log(convertMs(2000).days); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// ----------STYLES-------------
const timerStyles = refs.timer.style;
timerStyles.gap = '10px';
timerStyles.display = 'flex';
timerStyles.marginTop = '20px';
timerStyles.textAlign = 'center';
timerStyles.fontWeight = '500';
refs.fields.forEach(field => {
  const valueStyles = field.firstElementChild.style;
  const labelStyles = field.lastElementChild.style;
  valueStyles.fontSize = '30px';
  valueStyles.display = 'block';
  labelStyles.fontSize = '12px';
  labelStyles.textTransform = 'uppercase';
});
