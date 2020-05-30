const listContainer = document.querySelector('.todo-list');

window.load = getAllTodos();

function getCount() {
    if(localStorage) {
        let counter = 0;
        for (let i = 1; i <= localStorage.length; i++) {
            counter++;
        }
        document.querySelector('.counter').textContent = counter + " task(s) left";
    }
}

function getListItem(itemData, listContainer) {
    listContainer.insertAdjacentHTML('beforeend', `
    <li class="item" data-key="${itemData.id}">
        <input id="${itemData.id}" type="checkbox" >
        <label for="${itemData.id}" class="tick"></label>
        <span>${itemData.textValue}</span>
        <button class="delete">X</button>
    </li>`
    );
}

function getAllTodos() {
    if(localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
           let key = localStorage.key(i);
           if(key.substring(0, 3) == "uId") {
               let listItem = localStorage.getItem(key);
               let itemData = JSON.parse(listItem);
               getListItem(itemData, listContainer);
           }
        }
        getCount();
    }
}

function getSingleTodo(uId) {
    if(localStorage) {
        const itemData = JSON.parse(localStorage.getItem(uId));
        getListItem(itemData, listContainer);
    }
    getCount();
}

const saveTodo = document.querySelector('.btnAddTodo');
saveTodo.addEventListener('click', event => {
    event.preventDefault();
    const addTodoText = document.querySelector('.addTodo');
    const data = addTodoText.value.trim();

    const singleTodo = {
        id: Date.now(),
        completed: false,
        content: data
    };

    if(data != '') {
        localStorage.setItem("uId" + localStorage.length, JSON.stringify(singleTodo));
        addTodoText.value = "";
        addTodoText.focus();
        getSingleTodo("uId" + (localStorage.length -1));
    }
});

const toggleDone = key => { //Toggle each item done
    const index = todoItems.findIndex(item => item.id === Number(key)); //Set the index const to the first item that satisfies the callback func
    todoItems[index].checked = !todoItems[index].checked; //if it is checked, set it unchecked
  
    const item = document.querySelectorAll(`[data-key='${key}']`);
    if (todoItems[index].checked) { //Toggle the css class to display it on screen
      item[2].classList.add('done');
    } else {
      item[2].classList.remove('done');
    }
  }
  
  const deleteTodo = key => { //Delete todos using the same logic
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
  }

const delTodo = document.querySelector('.delete');
delTodo.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains(`textValue`)) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
        }//Add this if block
       if (event.target.classList.contains('delete-todo')) {
           const itemKey = event.target.parentElement.dataset.key;
           deleteTodo(itemKey);
           localStorage.setItem('items', JSON.stringify(todoItems));
           input.focus();
         }
});

function saveTodo(task, key) {

}

function getTodos(key) {

 }