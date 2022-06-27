function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => setTimeout((res(JSON.parse(xhr.response)), 5000));
    xhr.onerror = () => rej(`Something went wrong`);
    xhr.send();
  });
}

let data = fetch(
  `https://api.unsplash.com/photos/random/?client_id=cRr9h53dEjtvcSjCH58QwHcWsGgYIUC8ph4BEYGQXdI`
);
data
  .then(data => {
    console.log(data.color);
  })
  .catch(error => alert(`Check your Internet connection`));
