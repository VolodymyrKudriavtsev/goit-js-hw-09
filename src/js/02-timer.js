import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
  dateTimePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('span[data-days]').textContent,
  hoursValue: document.querySelector('span[data-hours]').textContent,
  minutesValue: document.querySelector('span[data-minutes]').textContent,
  secondsValue: document.querySelector('span[data-seconds]').textContent,
};
console.log(refs.daysValue);
console.log(refs.hoursValue);
console.log(refs.minutesValue);
console.log(refs.secondsValue);
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

console.log(convertMs(dateTime));

refs.daysValue = convertMs(dateTime).days;
refs.hoursValue = convertMs(dateTime).hours;
refs.minutesValue = convertMs(dateTime).minutes;
refs.secondsValue = convertMs(dateTime).seconds;

console.log(refs.daysValue);
console.log(refs.hoursValue);
console.log(refs.minutesValue);
console.log(refs.secondsValue);

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
refs.fields.forEach(field => {
  const valueStyles = field.firstElementChild.style;
  const labelStyles = field.lastElementChild.style;
  valueStyles.fontSize = '30px';
  valueStyles.fontWeight = '500';
  valueStyles.display = 'block';
  valueStyles.textAlign = 'center';
  labelStyles.fontSize = '12px';
  labelStyles.fontWeight = '500';
  labelStyles.textTransform = 'uppercase';
});
