(function(){
  document.addEventListener('DOMContentLoaded', () => {
    let UL = document.getElementsByTagName("ul")
    let allLists = document.getElementsByTagName("li");
    let button = document.querySelector(".button");
    let newTask = document.createElement("li");
    var addTask = document.querySelector(".add-task");
    let lists = document.querySelector(".ul-lists");


    let listItems = [];

    function addTodo(text) {
      const todo = {
        text,
        checked: false,
        id: Date.now()
      };
      listItems.push(todo);
      console.log(listItems);
      showTodo(todo)
    }

    function showTodo(todo){
      const checked = todo.checked ? 'done': '';

      const eachList = document.createElement("div");
      eachList.setAttribute('class', `each-li ${checked}`);
      eachList.setAttribute('data-key', todo.id);

      eachList.innerHTML = `
      <div class="li-del" id="${todo.id}">
      <div class="list-marker"></div>
      <li id="each-li">${todo.text}</li>
      </div>
      <img class="delete" src="/assets/images/icons8-delete-96.png" alt="" srcset="">
    `;
    lists.append(eachList);
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const input = addTask.value.trim();
      if (input !== '') {
        addTodo(input);
        addTask.value = '';
        addTask.focus();
      }
    })

    lists.addEventListener('click', event => {
      if (event.target.classList.contains('list-marker')) {
        const taskID = event.target.parentElement;
        // event.target.parentElement.firstChild.style.textDecoration = "line-through";
        event.target.classList.toggle('list-marker-incomplete');
    }
      if(event.target.classList.contains('delete')) {
        const taskID = event.target.parentElement;
        taskID.remove();
        // console.log(taskID)
      }
    });


  })
}())