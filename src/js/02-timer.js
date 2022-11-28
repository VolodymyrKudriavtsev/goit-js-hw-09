import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateTimePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  valueSpans: document.querySelectorAll('.value'),
};

// console.log(refs.valueSpans[0])

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
  },
};
flatpickr('input#datetime-picker', options);

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
  console.log(currentDateTime);

  timerId = setInterval(() => {
    differenceDateTime -= 1000;

    refs.valueSpans[0].textContent = convertMs(differenceDateTime).days;
    refs.valueSpans[1].textContent = convertMs(differenceDateTime).hours;
    refs.valueSpans[2].textContent = convertMs(differenceDateTime).minutes;
    refs.valueSpans[3].textContent = convertMs(differenceDateTime).seconds;
  }, 1000);

  // !!!------------Как остановить таймер???-----------------
  if (differenceDateTime === currentDateTime) {
    clearInterval(timerId);
  }
};

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

console.log(refs.valueSpans)

refs.valueSpans.forEach(value => {
  if(value.textContent === "00") {
    console.log('Hello!');
  }
})