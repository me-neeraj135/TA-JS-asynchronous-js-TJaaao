let input = document.querySelector(`input`);
let userImg = document.querySelector(`.githubUserImage`);
let userName = document.querySelector(`.userName`);
let follower = document.querySelectorAll(`.followerImg`);
let following = document.querySelectorAll(`.followingImg`);
let catImg = document.querySelector(`.catImg`);
let btn = document.querySelector(`button`);

// making request

let user = new XMLHttpRequest();
let followers = new XMLHttpRequest();
let followings = new XMLHttpRequest();
let cat = new XMLHttpRequest();

function displayUserUI(userData) {
  userImg.src = userData.avatar_url;
  userName.innerText = userData.name;
}

function displayFollowerUI(followerData) {
  follower.forEach((elm, index) => {
    elm.src = followerData[index].avatar_url;
  });
}
function displayFollowingUI(followingData) {
  following.forEach((elm, index) => {
    elm.src = followingData[index].avatar_url;
  });
}
function handleChange(event) {
  if (event.keyCode === 13) {
    user.open(`GET`, `https://api.github.com/users/${event.target.value}`);
    followers.open(
      `GET`,
      `https://api.github.com/users/${event.target.value}/followers`
    );
    followings.open(
      `GET`,
      `https://api.github.com/users/${event.target.value}/following`
    );
    user.onload = function () {
      let userData = JSON.parse(user.response);
      displayUserUI(userData);
      event.target.value = ``;
    };
    user.onerror = function () {
      alert(`something went wrong`);
    };
    user.send();

    followers.onload = function () {
      let followerData = JSON.parse(followers.response);
      displayFollowerUI(followerData);
    };
    followers.onerror = function () {
      alert(`something went wrong`);
    };
    followers.send();

    followings.onload = function () {
      let followingData = JSON.parse(followings.response);
      displayFollowingUI(followingData);
    };
    followings.onerror = function () {
      alert(`something went wrong`);
    };
    followings.send();
  }
}

function changeImage(event) {
  cat.open(
    `GET`,
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`
  );
  cat.onload = function () {
    let catData = JSON.parse(cat.response);
    console.log(catData);
    catImg.src = catData[0].url;
  };
  cat.send();
}

input.addEventListener(`keyup`, handleChange);
btn.addEventListener(`click`, changeImage);
