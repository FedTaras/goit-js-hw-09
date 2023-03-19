import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  let delay = Number(ev.target.delay.value);
  const step = Number(ev.target.step.value);
  const amount = Number(ev.target.amount.value);

  let position = 0;

  for (let i = 1; i <= amount; i++) {
    position += 1;
    delay += step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.failure(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.success(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }
  ev.currentTarget.reset();
}
