// let one = Promise.resolve(1);
// let two = Promise.resolve(2);
// let three = Promise.resolve(3);
// let four = Promise.resolve(4);
// let five = Promise.resolve(5);

let one = new Promise((res, rej) => {
  setTimeout(() => res(`Arya`), 1000);
});

let two = new Promise((res, rej) => {
  setTimeout(() => rej(`Whoops`), 2000);
});

let three = new Promise((res, rej) => {
  setTimeout(() => res(`John`), 3000);
});

let four = new Promise((res, rej) => {
  setTimeout(() => res(`Bahubali`), 4000);
});

let all = Promise.all([one, two, three, four])
  .then(res => console.log(res))
  .catch(error => console.log(error));
