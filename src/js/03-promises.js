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

// createPromise(2, 1500).then(onSuccess).catch(onError);

function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms - ` + Date.now());
}

function onError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms - ` + Date.now());
}

// let POSITION = 0;

// function experiment(DELAY, STEP, AMOUNT) {
//   console.log(Date.now());
//   // STEP = 0;
//   setTimeout(() => {
//     // STEP = STEP;
//     intervalId = setInterval(() => {
//       const shouldResolve = Math.random() > 0.3;
//       COUNTER += 1;
//       POSITION += 1;
//       // DELAY += STEP;

//       if (shouldResolve) {
//         console.log(
//           `✅ Fulfilled promise ${POSITION} in ${(DELAY += STEP)}ms - ` +
//             Date.now()
//         );
//       } else {
//         console.log(
//           `❌ Rejected promise ${POSITION} in ${(DELAY += STEP)}ms - ` +
//             Date.now()
//         );
//       }

//       if (COUNTER === AMOUNT) {
//         clearInterval(intervalId);
//         return;
//       }
//     }, STEP);
//   }, DELAY);
// }

// experiment(2000, 1000, 5)

function experiment_1_ON_SUBMIT(STEP, AMOUNT) {
  console.log(Date.now());
  createPromise(2, 2000).then(onSuccess).catch(onError);
  let COUNTER = 1;

  intervalId = setInterval(() => {
    COUNTER += 1;

    createPromise(2, 2000).then(onSuccess).catch(onError);
    if (COUNTER === AMOUNT) {
      clearInterval(intervalId);
      return;
    }
  }, STEP);
}

experiment_1_ON_SUBMIT(1000, 3);
