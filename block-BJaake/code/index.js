let root = document.querySelector(`.root`);
let select = document.querySelector(`select`);

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

function fetch(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();

    xhr.open(`GET`, url);

    xhr.onload = () => res(JSON.parse(xhr.response));
    xhr.onerror = () => rej(`Something went wrong!`);

    xhr.send();
  });
}

function createUI(newsData) {
  root.innerHTML = ``;
  newsData.forEach((data, index) => {
    let li = document.createElement(`li`);
    let imageBox = document.createElement(`img`);
    imageBox.className = `image`;
    imageBox.src = data.imageUrl;

    let div = document.createElement(`div`);
    div.classList.add(`detailed`);
    let summary = document.createElement(`p`);
    summary.className = `summary`;
    summary.innerText = data.summary || data.title;
    let title = document.createElement(`p`);
    title.innerText = data.newsSite;

    title.className = `title`;
    let btn = document.createElement(`button`);
    btn.innerText = `Read More`;
    btn.className = `btn`;
    div.append(title, summary, btn);
    li.append(imageBox, div);
    root.append(li);
  });
}
fetch(url).then(createUI).catch(console);

function handleSelect(event) {
  let value = event.target.value;
  let query = `https://api.spaceflightnewsapi.net/v3/articles?title_contains=${value}`;

  fetch(query).then(createUI).catch(console);
}

select.addEventListener(`change`, handleSelect);
