const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

const timeDelay = form.delay.value;
const intervalStep = Number(form.step.value);

function onSubmit(evt) {
  evt.preventDefault();
  let counter = 0;

  setTimeout(() => {
    createPromise(counter, intervalStep)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }, timeDelay);
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    const amount = Number(form.amount.value);

    setTimeout(() => {
      for (let i = 1; i <= amount; i++) {
        position += i;

        if (shouldResolve) {
          res(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          rej(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }
    }, timeDelay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
