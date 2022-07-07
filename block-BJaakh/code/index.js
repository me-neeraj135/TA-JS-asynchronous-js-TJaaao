let inputBox = document.querySelector(`.input`);

let rootUl = document.querySelector(`ul`);

let baseUlr = `https://basic-todo-api.vercel.app/api/todo`;

function createUi(data) {
  rootUl.innerHTML = ``;
  // console.log(data);

  data.forEach((todo, i) => {
    // console.log(todo);
    const dFrag = document.createDocumentFragment();

    let li = document.createElement(`li`);
    let checkParaBox = document.createElement(`div`);
    let checkbox = document.createElement(`input`);

    checkbox.type = `checkbox`;
    checkbox.checked = false;

    let para = document.createElement(`p`);

    para.innerText = todo.title;

    function handleEdit(e) {
      let updated = e.target.parentElement;
      updated.appendChild(input, p);
      console.log(updated);
    }

    para.addEventListener(`dblclick`, handleEdit);

    let close = document.createElement(`span`);
    close.className = `closeBtn`;
    close.innerText = `❌`;

    checkParaBox.append(checkbox, para);
    li.append(checkParaBox, close);
    dFrag.appendChild(li);

    rootUl.append(dFrag);

    // handle delete function

    function handleDelete(e) {
      let deleted = data[i]._id;
      console.log(data[i]._id);

      fetch(baseUlr + `/${deleted}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });
      createUi(data);
    }
    close.addEventListener(`click`, handleDelete);
  });
}

function handleInput(event) {
  let inputValue = event.target.value;
  if (event.keyCode === 13) {
    // console.log(inputValue);

    fetch(baseUlr)
      .then(res => res.json())
      .then(todoData => {
        let allTodo = todoData.todos;
        createUi(allTodo);
      });

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
    });
  }
}

inputBox.addEventListener(`keyup`, handleInput);
