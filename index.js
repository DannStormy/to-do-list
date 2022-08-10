(function(){
  document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector(".button");
    let addTask = document.querySelector(".add-task");
    let lists = document.querySelector(".ul-lists");


    let listItems = [];

    function addTodo(text) {
      const todo = {
        text,
        checked: false,
        id: Date.now()
      };

      listItems.push(todo);
      localStorage.setItem("todos", JSON.stringify(listItems));
      console.log(listItems);
      showTodo(todo)
    }

    lists.addEventListener('click', (event) =>{
      const item = event.target;
      if(item.classList[0] === 'delete'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', () => {
          todo.remove()
        })
        // todo.remove()
      }
      if(item.classList[0] === 'list-marker-incomplete'){
        const todo = item.parentElement;
        item.classList.toggle('list-marker')
        todo.classList.toggle('show-completed')
      }
  })

    function showTodo(todo){
      const checked = todo.checked ? 'done': '';
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

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const input = addTask.value.trim();
      if (input !== '') {
        addTodo(input);
        addTask.value = '';
        addTask.focus();
      }else{
        alert("Task can't be empty")
      }
    })

    // lists.addEventListener('click', event => {
    //   if (event.target.classList.contains('list-marker')) {
    //     const taskID = event.target.parentElement;
    //     // event.target.parentElement.firstChild.style.textDecoration = "line-through";
    //     // listDecor.classList.toggle(".show-red")
    //     // for (let i = 0; i < listDecor.length; i++){
    //     //   console.log(listDecor[i])
    //     // }
    //     event.target.classList.toggle('list-marker-incomplete');
    //     // let dataKey = document.querySelector('[data-key]').className;
    //     // dataKey[0].classList.toggle('show-red');
    //       // dataKey[i].style.color = "red";
    // }
    //   if(event.target.classList.contains('delete')) {
    //     const taskID = event.target.parentElement;
    //     taskID.remove();
    //     // console.log(taskID.id)
    //   }
    // });


  })
}())