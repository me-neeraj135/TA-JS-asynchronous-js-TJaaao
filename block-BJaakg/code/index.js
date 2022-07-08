let modalWindow = document.querySelector(`.modalWindow`);
let modalClose = document.querySelector(`.modalClose`);

let charactersUl = document.querySelector(`.charactersUl`);

let bookUl = document.querySelector(`.root`);
let openButton = document.querySelector(`.btn`);

const booksUrl = `https://www.anapioficeandfire.com/api/books`;

function handleSpinner(rootElm, status = false) {
  if (status) {
    rootElm.innerHTML = `<div class="spinner">
    <div class="donut"></div>
    </div>`;
  }
}

function displayCharacters(characters) {
  handleSpinner(charactersUl, true);

  Promise.all(
    characters.map(character => fetch(character).then(res => res.json()))
  ).then(charactersData => {
    charactersUl.innerHTML = ``;
    charactersData.forEach(char => {
      let charList = document.createElement(`li`);
      charList.className = `charList`;
      charList.innerText = `${char.name}:(${char.aliases.join(` `)})`;
      charactersUl.append(charList);
    });
  });
}

function displayBooks(data) {
  bookUl.innerHTML = ``;
  data.forEach(book => {
    let li = document.createElement(`li`);
    li.className = `bookList`;
    let h3 = document.createElement(`h3`);
    h3.innerText = book.name;
    let p = document.createElement(`p`);
    p.innerText = book.authors.join(``);
    let button = document.createElement(`button`);
    button.className = `btn`;
    button.innerText = `Show character (${book.characters.length})`;
    li.append(h3, p, button);
    bookUl.append(li);

    button.addEventListener(`click`, () => {
      bookUl.style.display = `none`;
      modalWindow.style.display = `block`;
      displayCharacters(book.characters);

      modalClose.addEventListener(`click`, () => {
        modalWindow.style.display = `none`;
        bookUl.style.display = `grid`;
      });
    });
  });
}

function fetchBooks() {
  handleSpinner(bookUl, true);
  fetch(booksUrl)
    .then(res => res.json())
    .then(booksData => {
      displayBooks(booksData);
    })
    .finally(() => {
      handleSpinner(bookUl);
    });
}
fetchBooks();
