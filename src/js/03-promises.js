function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('ok');
        // Fulfill
      } else {
        reject('no');
        // Reject
      }
    }, delay);
  });

  // if (shouldResolve) {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay} ms`); // Fulfill
  // } else {
  //   console.log(`❌ Rejected promise ${position} in ${delay} ms`); // Reject
  // }
}

const formRef = document.querySelector('.form');
const promises = [];

formRef.addEventListener('submit', onSubmit);

function onSubmit(ev) {
  ev.preventDefault();

  const delay = Number(ev.target.delay.value);
  const step = Number(ev.target.step.value);
  const amount = Number(ev.target.amount.value);

  let position = 0;
  let addDelay = 0;

  for (let i = 1; i <= amount; i++) {
    position += i;
    addDelay = delay;
    addDelay += step;
    console.log(addDelay);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
      });

    // setTimeout(() => {
    //   createPromise(position, delay);
    //   // const timerId = setInterval(() => {
    //   //   if (timerId === amount) {
    //   //     clearInterval(timerId);
    //   //   }
    //   // }, addDelay);
    // }, delay);
  }
  ev.currentTarget.reset();
}
