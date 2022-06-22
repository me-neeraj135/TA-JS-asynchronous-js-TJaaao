let input = document.querySelector(`input`);
let userImg = document.querySelector(`.githubUserImage`);
let userName = document.querySelector(`.userName`);
let follower = document.querySelector(`.follower`);
let following = document.querySelector(`.following`);
let catImg = document.querySelector(`.catImg`);
let btn = document.querySelector(`button`);

// fetching data

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open(`GET`, url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error(`something went wrong`);
  };
  xhr.send();
}

// display extra info
function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = ``;

  fetch(url, function (followingList) {
    let topFive = followingList.slice(0, 5);
    topFive.forEach(info => {
      let li = document.createElement(`li`);
      let image = document.createElement(`img`);
      image.src = info.avatar_url;
      image.className = `followerImg`;
      li.append(image);
      rootElm.append(li);
    });
  });
}

// handling user image and user name
function handleDisplay(userInfo) {
  userImg.src = userInfo.avatar_url;
  userName.innerText = userInfo.name;
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/followers`,
    follower
  );
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/following`,
    following
  );
}

// handling input user name
function handleInput(event) {
  if (event.keyCode === 13 && event.target.value) {
    let url = `https://api.github.com/users/`;
    let userName = input.value;
    fetch(url + userName, handleDisplay);
    event.target.value = ``;
  }
}

// random cat image access
let cat = new XMLHttpRequest();
let catUrl = `https://api.thecatapi.com/v1/images/search?limit=1&size=full`;
function changeImage(event) {
  cat.open(`GET`, catUrl);
  cat.onload = function () {
    let catData = JSON.parse(cat.response);
    console.log(catData);
    catImg.src = catData[0].url;
  };
  cat.send();
}

input.addEventListener(`keyup`, handleInput);
btn.addEventListener(`click`, changeImage);
