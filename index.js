(function () {
  document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector(".button");
    let addTask = document.querySelector(".add-task");
    let lists = document.querySelector(".ul-lists");
    let whichTodos = document.querySelector(".check-todos");

    let listItems = [];

    function addTodo(text) {
      const todo = {
        text,
        checked: false,
        id: Date.now()
      };
      listItems.push(todo);
      // local(listItems)
      showTodo(todo)
    }

    function showTodo(todo) {
      const checked = todo.checked ? 'done' : '';
      const eachList = document.createElement("div");
      eachList.setAttribute('class', `each-li ${checked}`);
      eachList.setAttribute('data-key', todo.id);
      eachList.innerHTML = `
      <div class="li-del" id="${todo.id}">
      <div class="list-marker-incomplete"></div>
      <li class="li-text">${todo.text}</li>
      </div>
      <img class="delete" src="/assets/images/icons8-delete-96.png" alt="" srcset="">
    `;
      lists.append(eachList);
    }

    function completed(e) {
      const todos = lists.childNodes;
      let choice = e.target.value;
      for (let i = 0; i < todos.length; i++) {
          if (choice === 'completed') {
            let check = todos[i].nextSibling.firstChild.nextElementSibling;
            if (!check.classList.contains("show-completed")) {
              check.style.display = 'none';
              check.nextElementSibling.style.display = 'none'
            }else{
              check.style.display = 'flex';
              check.nextElementSibling.style.display = 'flex'
            }
          }
          if (choice === 'incomplete') {
            let check = todos[i].nextSibling.firstChild.nextElementSibling;
            console.log(todos[i].nextSibling)
            if (check.classList.contains("show-completed")) {
              check.style.display = 'none';
              check.nextElementSibling.style.display = 'none'
            }else{
              check.style.display = 'flex';
              check.nextElementSibling.style.display = 'flex'
            }
          }
          if(choice === 'all'){
            let check = todos[i].nextSibling.firstChild.nextElementSibling;
            if (check.classList.contains("show-completed")) {
              check.style.display = 'flex';
              check.nextElementSibling.style.display = 'flex'
            }
          }
        }
    }

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