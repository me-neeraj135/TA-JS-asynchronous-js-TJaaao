function myFunction() {
  let input = document.querySelector(`input`);
  let imageUL = document.querySelector(`.imageContainer`);
  let allLi = document.querySelectorAll(`li`);
  let images = document.querySelectorAll(`img`);

  let url = `https://api.unsplash.com/photos/?client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM`;
  let getSearchUrl = query =>
    `https://api.unsplash.com/search/photos?query=${query}&per_page=20;client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM`;
  function fetch(url) {
    imageUL.innerHTML = ``;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(`GET`, url);
      xhr.onload = () => resolve(JSON.parse(xhr.response));

      xhr.onerror = () => reject(`Some went wrong!`);

      xhr.send();
    });
  }

  function createUI(images) {
    images.forEach(image => {
      let li = document.createElement(`li`);
      let img = document.createElement(`img`);
      img.src = image.urls.small;
      li.append(img);
      imageUL.append(li);
    });
  }

  fetch(url)
    .then(createUI)
    .catch(error => {
      alert(`Something went wrong!`);
    });

  function handleSearch(event) {
    let query = event.target.value;
    if (event.keyCode === 13 && event.target.value) {
      fetch(getSearchUrl(query))
        .then(searchResult => {
          createUI(searchResult.results);
          event.target.value = ``;
        })
        .catch(error => {
          alert(`Something went wrong!`);
        });
    }
  }

  input.addEventListener(`keyup`, handleSearch);
}

myFunction();
