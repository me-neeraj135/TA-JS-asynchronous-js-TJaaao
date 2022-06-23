let input = document.querySelector(`input`);
let imageUL = document.querySelector(`.imageContainer`);
let allLi = document.querySelectorAll(`li`);
let images = document.querySelectorAll(`img`);
// YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM;

// api.unsplash.com/photos/?client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM;

function fetch(url, handleSuccess) {
  let xhr = new XMLHttpRequest();
  xhr.open(`GET`, url);
  xhr.onload = () => handleSuccess(JSON.parse(xhr.response));
  xhr.send();
}

function createUI(imageData) {
  imageUL.innerHTML = ``;
  imageData.results.forEach((elm, index) => {
    let li = document.createElement(`li`);

    let img = document.createElement("img");
    let imgLink = elm.urls.small;
    img.src = imgLink;
    li.append(img);
    imageUL.append(li);
    console.log(elm.urls.small);
  });
}

function handleInput(event) {
  let search = event.target.value;

  if (event.keyCode === 13) {
    let url = `https://api.unsplash.com/search/photos?query=${search}&per_page=20;client_id=YS42_H0p9kPvayh3ke7A5hDkcd1oNtN5Nzm0qESWFuM`;
    fetch(url, createUI);
    event.target.value = ``;
  }
}

input.addEventListener(`keyup`, handleInput);
