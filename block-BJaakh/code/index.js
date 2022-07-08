let inputBox = document.querySelector(`.input`);

let rootUl = document.querySelector(`ul`);

let baseUlr = `https://basic-todo-api.vercel.app/api/todo`;

function handleDelete(id) {
  fetch(baseUlr + `/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // console.log(`delete`, res);
    displayTodos();
  });
}

function handleToggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };

  fetch(baseUlr + `/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    // console.log(`delete`, res);
    displayTodos();
  });
}

function handleEdit(e, id) {
  let editBox = document.createElement(`input`);
  editBox.value = e.target.innerText;
  let p = e.target;
  let parent = e.target.parentElement;
  parent.replaceChild(editBox, p);
  // console.log(input, p, parent);

  editBox.addEventListener(`keyup`, e => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      let data = {
        todo: {
          title: editBox.value,
        },
      };

      fetch(baseUlr + `/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }).then(() => {
        displayTodos();
      });
      parent.replaceChild(p, editBox);
    }
  });
}

function createUi(data) {
  rootUl.innerHTML = ``;
  console.log(data);
  data.forEach((todo, i) => {
    console.log(todo);
    const dFrag = document.createDocumentFragment();

    let li = document.createElement(`li`);
    let checkParaBox = document.createElement(`div`);
    let checkbox = document.createElement(`input`);
    checkbox.className = `checkBox`;
    checkbox.type = `checkbox`;
    checkbox.checked = todo.isCompleted;
    checkbox.setAttribute(`data-id`, todo._id);
    checkbox.addEventListener(`change`, () =>
      handleToggle(todo._id, todo.isCompleted)
    );

    let para = document.createElement(`p`);

    para.innerText = todo.title;

    para.addEventListener(`dblclick`, event => handleEdit(event, todo._id));

    let close = document.createElement(`span`);
    close.className = `closeBtn`;
    close.innerText = `❌`;
    close.addEventListener(`click`, () => handleDelete(todo._id));

    checkParaBox.append(checkbox, para);
    li.append(checkParaBox, close);
    dFrag.appendChild(li);

    rootUl.append(dFrag);
  });
}

function displayTodos() {
  fetch(baseUlr)
    .then(res => res.json())
    .then(todoData => {
      let allTodo = todoData.todos;
      createUi(allTodo);
    });
}

function addTodo(e) {
  let inputValue = e.target.value;

  if (e.keyCode === 13 && inputValue.trim()) {
    // console.log(inputValue);
    let data = {
      todo: {
        title: `${inputValue}`,
        isCompleted: false,
      },
    };

    fetch(baseUlr, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(() => {
      displayTodos();
      e.target.value = ``;
    });
  }
}

inputBox.addEventListener(`keyup`, addTodo);

displayTodos();
