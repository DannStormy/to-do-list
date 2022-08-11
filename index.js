(function () {
  document.addEventListener('DOMContentLoaded', () => {
    //select needed elements
    let button = document.querySelector(".button");
    let addTask = document.querySelector(".add-task");
    let lists = document.querySelector(".ul-lists");
    let whichTodos = document.querySelector(".check-todos");

    //array to store all tasks
    //let listItems = [];

    function addTodo(text) {
      //task objects
      const todo = {
        text,
        checked: false,
        id: Date.now()
      };
      //push each task to listItems array
      //listItems.push(todo);
      //call showtodo and pass todo object as arg
      showTodo(todo)
    }

    //function to display each task
    function showTodo(todo) {
      //checked class depending on task state, not working yet
      const checked = todo.checked ? 'done' : '';
      //create eachlist div
      const eachList = document.createElement("div");
      eachList.setAttribute('class', `each-li ${checked}`);
      eachList.setAttribute('data-key', todo.id);
      //eachlist div content
      eachList.innerHTML = `
      <div class="li-del" id="${todo.id}">
      <div class="list-marker-incomplete"></div>
      <li contenteditable="true" class="li-text">${todo.text}</li>
      </div>
      <img class="delete" src="/assets/images/icons8-delete-96.png" alt="" srcset="">
    `;
      //append each div to ul
      lists.append(eachList);
    }

    function completed(e) {
      //select all nodes in ul
      const todos = lists.childNodes;
      //pull value from event
      let choice = e.target.value;
      //loop through all nodes and add styling based on choice values
      for (let i = 0; i < todos.length - 1; i++) {
        if (choice === 'completed') {
          let check = todos[i].nextSibling.children[0];
          if (!check.classList.contains("show-completed")) {
            check.style.display = 'none';
            check.parentElement.style.marginBottom = '0';
            check.nextElementSibling.style.display = 'none'
          } else {
            check.style.display = 'flex';
            check.parentElement.style.marginBottom = '20px';
            check.nextElementSibling.style.display = 'flex'
          }
        }
        if (choice === 'incomplete') {
          let check = todos[i].nextSibling.children[0];
          if (check.classList.contains("show-completed")) {
            check.style.display = 'none';
            check.parentElement.style.marginBottom = '0';
            check.nextElementSibling.style.display = 'none'
          } else {
            check.style.display = 'flex';
            check.parentElement.style.marginBottom = '20px';
            check.nextElementSibling.style.display = 'flex'
          }
        }
        if (choice === 'all') {
          let check = todos[i].nextSibling.children[0];
          if (check.classList.contains("show-completed")) {
            check.style.display = 'flex';
            check.parentElement.style.marginBottom = '20px';
            check.nextElementSibling.style.display = 'flex'
          }
        }
      }
    }

    //whichtodo func runs on change
    whichTodos.addEventListener('change', completed);

    lists.addEventListener('click', (event) => {
      // console.log(event.target)
      const item = event.target;
      if (item.classList[0] === 'delete') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
          todo.remove()
        })
      }
      if (item.classList[0] === 'list-marker-incomplete') {
        const todo = item.parentElement;
        item.classList.toggle('list-marker')
        todo.classList.toggle('show-completed')
      }
    })

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const input = addTask.value.trim();
      if (input !== '') {
        addTodo(input);
        addTask.value = '';
        addTask.focus();
      } else {
        alert("Task can't be empty")
      }
    })
  })
}());