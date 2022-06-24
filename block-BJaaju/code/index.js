function myFunction() {
  let input = document.querySelector(`input`);
  let imageUL = document.querySelector(`.imageContainer`);
  let allLi = document.querySelectorAll(`li`);
  let images = document.querySelectorAll(`img`);

  let url = `https://api.unsplash.com/photos/?client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM`;
  let getSearchUrl = query =>
    `https://api.unsplash.com/search/photos?query=${query}&per_page=20;client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM`;
  function fetch(url, successHandler) {
    imageUL.innerHTML = ``;
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, url);
    xhr.onload = () => successHandler(JSON.parse(xhr.response));

    xhr.onerror = function () {
      console.error(`Something went wrong!`);
    };

    xhr.send();
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

  fetch(url, createUI);

  function handleSearch(event) {
    let query = event.target.value;
    if (event.keyCode === 13 && event.target.value) {
      fetch(getSearchUrl(query), searchResult => {
        createUI(searchResult.results);
      });
    }
  }

  input.addEventListener(`keyup`, handleSearch);
}

myFunction();
