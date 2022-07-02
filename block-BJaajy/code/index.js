let time = [1, 2, 3, 4];
let timePromise = time.map(
  second =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.random());
      }, second * 1000);
    })
);
Promise.all(timePromise).then(resolve => console.log(resolve));

let user = [`fabpot`, `andrew`, `taylorotwell`, `egoist`, `HugoGiraudel`];

let userPromise = user.map(name => {
  return fetch(`https://api.github.com/users/${name}`).then(res => res.json());
});

Promise.all(userPromise).then(user =>
  user.forEac(user => console.log(user.followers))
);

let promiseOne = fetch(`https://random.dog/woof.json`).then(res => res.json());

let promiseTwo = fetch(`https://aws.random.cat/meow`).then(res => res.json());

Promise.race([promiseOne, promiseTwo]).then(res => console.log(res));
