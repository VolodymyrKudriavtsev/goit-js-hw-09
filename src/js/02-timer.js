import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  valueSpans: document.querySelectorAll('.value'),
};
// refs.startBtn.setAttribute('disabled', true);
console.log(refs.startBtn);
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }

    refs.startBtn.removeAttribute('disabled');
  },
};
flatpickr('input#datetime-picker', options);

//! const timerStart = () => {};
//! const timerStop = () => {};

const timer = {};

const currentDateTime = Date.now();

const getDifference = () => {
  const selectedDateTime =
    refs.dateTimePicker._flatpickr.selectedDates[0].getTime();

  return selectedDateTime - currentDateTime;
};

const onStartBtnClick = () => {
  refs.startBtn.setAttribute('disabled', true);
  refs.dateTimePicker.setAttribute('disabled', true);

  let differenceDateTime = getDifference();

  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(differenceDateTime);
    differenceDateTime -= 1000;

    refs.valueSpans[0].textContent = days;
    refs.valueSpans[1].textContent = hours;
    refs.valueSpans[2].textContent = minutes;
    refs.valueSpans[3].textContent = seconds;
  }, 1000);

  // !!!------------Как остановить таймер???-----------------
};
// function name(id) {
//   if (
//     refs.valueSpans[0].textContent === '00' &&
//     refs.valueSpans[1].textContent === '00' &&
//     refs.valueSpans[2].textContent === '00' &&
//     refs.valueSpans[3].textContent === '00'
//   ) {
//     clearInterval(id);
//   }
// }

refs.startBtn.addEventListener('click', onStartBtnClick);

// ----------TIME CONVERT------------
const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// ----------STYLES-------------
const timerStyles = document.querySelector('.timer').style;
const fields = document.querySelectorAll('.field');
timerStyles.gap = '10px';
timerStyles.display = 'flex';
timerStyles.marginTop = '20px';
timerStyles.textAlign = 'center';
timerStyles.fontWeight = '500';
fields.forEach(field => {
  const valueStyles = field.firstElementChild.style;
  const labelStyles = field.lastElementChild.style;
  valueStyles.fontSize = '30px';
  valueStyles.display = 'block';
  labelStyles.fontSize = '12px';
  labelStyles.textTransform = 'uppercase';
});

//! setInterval(() => {
//!   let selectedTime = refs.dateTimePicker._flatpickr.selectedDates[0].getTime();
//!   const curTime = Date.now();
//!   const difTime = selectedTime - curTime;
//!   console.log(convertMs(difTime));
//! }, 1000);
