import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    useIcon: false,
  });
}

function onFormSubmit(e) {
  console.log(Date.now());

  e.preventDefault();

  let position = 0;
  let step = Number(form.elements.step.value);
  let delay = Number(form.elements.delay.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    position += 1;
    createPromise(position, delay).then(onSuccess).catch(onError);
    delay += step;
  }
}

form.addEventListener('submit', onFormSubmit);
