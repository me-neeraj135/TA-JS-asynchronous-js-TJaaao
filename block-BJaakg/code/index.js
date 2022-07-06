let root = document.querySelector(`.root`);
let div = document.querySelector(`div`);
let closeBtn = document.querySelector(`.closeBtn`);

fetch(`https://www.anapioficeandfire.com/api/books`)
  .then(res => res.json())
  .then(info =>
    info.forEach(book => {
      let li = document.createElement(`li`);
      li.className = `list`;
      let bookName = document.createElement(`h2`);
      bookName.innerText = book.name;
      let author = document.createElement(`p`);
      author.innerText = book.authors;
      let anchor = document.createElement(`a`);
      let btn = document.createElement(`button`);
      btn.innerText = `Show Characters:${book.characters.length}`;

      anchor.append(btn);
      li.append(bookName, author, anchor);
      root.append(li);

      function fetchData(url) {
        return new Promise((res, rej) => {
          let xhr = new XMLHttpRequest();
          xhr.open(`GET`, url);
          xhr.onload = () => res(JSON.parse(xhr.response));
          xhr.onerror = () => rej(`Something went wrong!`);
          xhr.send();
        });
      }

      function handleChar(e) {
        div.innerHTML = ``;

        console.log(e);
        div.style.display = `block`;
        root.style.display = `none`;
        let chars = book.characters;
        let closeSpn = document.createElement(`span`);
        closeSpn.className = `closeSpn`;
        let closeBtn = document.createElement(`button`);
        closeBtn.className = `closeBtn`;
        closeBtn.innerText = `Close❌`;

        closeSpn.append(closeBtn);
        div.append(closeSpn);

        Promise.all([...chars]).then(res => {
          console.log(res);
          res.forEach((data, index) => {
            let charsList = document.createElement(`li`);

            charsList.className = `charsList`;
            // charsList.style.backgroundColor = `#D3EAFD`;
            charsList.style.border = ` 2px solid white`;

            let charsName = document.createElement(`p`);
            charsList.append(charsName);
            fetchData(data).then(res => {
              console.log(res);
              charsName.innerText = `${res.name}(aliases:${res.aliases[0]},title:${res.titles})`;
              div.append(charsList);
            });
          });
        });

        closeBtn.addEventListener(`click`, e => {
          // console.log(e);
          div.innerHTML = ``;
          div.style.display = `none`;
          root.style.display = `grid`;
        });
      }
      btn.addEventListener(`click`, handleChar);
    })
  );
