let root = document.querySelector(`.root`);
let select = document.querySelector(`select`);
let allNews = [];

let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

// function fetch(url) {
//   return new Promise((res, rej) => {
//     let xhr = new XMLHttpRequest();

//     xhr.open(`GET`, url);

//     xhr.onload = () => res(JSON.parse(xhr.response));
//     xhr.onerror = () => rej(`Something went wrong!`);

//     xhr.send();
//   });
// }

// function createUI(newsData) {
//   root.innerHTML = ``;
//   newsData.forEach((data, index) => {
//     let li = document.createElement(`li`);
//     let imageBox = document.createElement(`img`);
//     imageBox.className = `image`;
//     imageBox.src = data.imageUrl;

//     let div = document.createElement(`div`);
//     div.classList.add(`detailed`);
//     let summary = document.createElement(`p`);
//     summary.className = `summary`;
//     summary.innerText = data.summary || data.title;
//     let title = document.createElement(`p`);
//     title.innerText = data.newsSite;

//     title.className = `title`;
//     let btn = document.createElement(`button`);
//     btn.innerText = `Read More`;
//     btn.className = `btn`;
//     div.append(title, summary, btn);
//     li.append(imageBox, div);
//     root.append(li);
//   });
// }
// fetch(url).then(createUI).catch(console);

// function handleSelect(event) {
//   let value = event.target.value;
//   let query = `https://api.spaceflightnewsapi.net/v3/articles?title_contains=${value}`;

//   fetch(query).then(createUI).catch(console);
// }

// select.addEventListener(`change`, handleSelect);

function randomNews(news) {
  root.innerHTML = ``;
  news.forEach(element => {
    let li = document.createElement(`li`);
    let image = document.createElement(`img`);
    image.classList.add(`image`);
    image.src = element.imageUrl;
    image.alt = element.title;
    let div = document.createElement(`div`);
    div.className = `detailed`;
    let spanDiv = document.createElement(`div`);
    let span = document.createElement(`span`);
    span.className = `title`;
    span.innerText = element.newsSite;
    spanDiv.append(span);
    let para = document.createElement(`p`);

    para.className = `summary`;
    para.innerText = element.summary;
    let btn = document.createElement(`button`);
    btn.className = `btn`;
    btn.innerText = `Read More`;
    let a = document.createElement(`a`);
    a.href = element.url;
    a.append(btn);
    div.append(spanDiv, para, a);

    li.append(image, div);
    root.append(li);
  });
}

function displayOption(allSources) {
  allSources.forEach(elm => {
    let opts = document.createElement(`option`);
    opts.value = elm;
    opts.innerText = elm;
    select.append(opts);
  });
}

fetch(url)
  .then(res => res.json())
  .then(news => {
    // console.log(news);
    allNews = news;
    randomNews(news);
    let allSources = Array.from(new Set(news.map(n => n.newsSite)));
    displayOption(allSources);

    console.log(allSources);
  });

select.addEventListener(`change`, event => {
  let source = event.target.value.trim();
  console.log(source);

  if (source) {
    var filteredNews = allNews.filter(news => news.newsSite === source);
  } else {
    filteredNews = allNews;
  }
  randomNews(filteredNews);
});
