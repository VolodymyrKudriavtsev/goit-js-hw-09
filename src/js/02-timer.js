import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  valueSpans: document.querySelectorAll('.value'),
};
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Please choose a date in the future');
    }

    refs.startBtn.disabled = false;
  },
};
flatpickr('input#datetime-picker', options);

const timer = {
  start() {
    console.log('START!!!');

    const selectedTime = refs.timePicker._flatpickr.selectedDates[0].getTime();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= selectedTime) {
        this.stop();
        return;
      }
      const deltaTime = selectedTime - currentTime;
      const time = convertMs(deltaTime);
      updateClockface(time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    console.log('STOP!!!');
    refs.timePicker.disabled = false;
  },
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.valueSpans[0].textContent = `${days}`;
  refs.valueSpans[1].textContent = `${hours}`;
  refs.valueSpans[2].textContent = `${minutes}`;
  refs.valueSpans[3].textContent = `${seconds}`;
}

const onStartBtnClick = () => {
  refs.startBtn.disabled = true;
  refs.timePicker.disabled = true;

  timer.start();
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
