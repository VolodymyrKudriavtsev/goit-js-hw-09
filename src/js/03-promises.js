function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        console.log(Date.now());
      } else {
        reject({ position, delay });
        console.log(Date.now());
      }
    }, 0);
  });
}

// createPromise(2, 1500).then(onSuccess).catch(onError);

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}

let DELAY = 2000;
let STEP = 1000;
let COUNTER = 0;
let AMOUNT = 3;
let POSITION = 0;

console.log('START  INTERVAL !!! - ' + Date.now());

const intervalId = setInterval(() => {
  COUNTER += 1;
  POSITION += 1;
  DELAY += STEP;

  createPromise(POSITION, DELAY).then(onSuccess).catch(onError);

  if (COUNTER === AMOUNT) {
    clearInterval(intervalId);
    return;
  }
}, STEP);
