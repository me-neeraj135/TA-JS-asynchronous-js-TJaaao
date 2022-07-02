(function () {
  let select = document.querySelector(`select`);
  let root = document.querySelector(`ul`);
  let allData = [];
  let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

  let main = document.querySelector(`.main`);
  let errElm = document.querySelector(`.error-message`);

  function handleErrorMessage(message = `Something went wrong❗️`) {
    main.style.display = `none`;
    errElm.innerText = message;
  }
  function handleSpin(status = false) {
    if (status) {
      root.innerHTML = `<div class="spinner">
    <div class="donut"></div></div>`;
    }
  }

  function createUI(data) {
    root.innerHTML = ``;
    // console.log(data);

    data.forEach(news => {
      let li = document.createElement(`li`);
      let image = document.createElement(`img`);
      image.className = `newsImage`;
      image.src = news.imageUrl;

      let infoDiv = document.createElement(`div`);
      infoDiv.className = `infoDiv`;
      let sourceDiv = document.createElement(`div`);
      sourceDiv.className = `sourceDiv`;
      let newsSource = document.createElement(`span`);
      sourceDiv.append(newsSource);

      newsSource.className = `newsSource`;
      newsSource.innerText = news.newsSite;
      let newsSummary = document.createElement(`p`);
      newsSummary.innerText = news.summary;

      let a = document.createElement(`a`);
      a.href = news.url;
      let btn = document.createElement(`button`);
      btn.innerText = `Read More`;
      a.append(btn);
      infoDiv.append(sourceDiv, newsSummary, a);
      li.append(image, infoDiv);

      root.append(li);
    });
  }

  function displayOption(data) {
    data.forEach(elm => {
      let opts = document.createElement(`option`);
      opts.value = elm;
      opts.innerText = elm;
      select.append(opts);
    });
  }
  function init() {
    handleSpin(true);
    fetch(url)
      .then(res => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`${res.status}`);
        }
      })
      .then(data => {
        handleSpin();
        if (Array.isArray(data)) {
          createUI(data);
          allData = data;
          let sources = [...new Set(data.map(elm => elm.newsSite))];
          displayOption(sources);
          // console.log(sources);
        }
      })
      .catch(error => {
        handleErrorMessage(error);
      })
      .finally(() => {
        handleSpin();
      });
  }

  select.addEventListener(`change`, event => {
    let source = event.target.value.trim();
    // console.log(source);
    if (source) {
      var filteredData = allData.filter(data => data.newsSite === source);
      createUI(filteredData);
    } else {
      createUI(allData);
    }
  });
  if (navigator.onLine) {
    init();
  } else {
    handleErrorMessage(`Check your internet connection ❌`);
  }
})();
