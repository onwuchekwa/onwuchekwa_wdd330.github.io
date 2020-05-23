function getTodo(timeId) {
    const data = JSON.parse(localStorage.getItem(timeId));
    const listContainer = document.querySelector('.todo-list');
    listContainer.insertAdjacentHTML('beforeend', `
    <li class="item" data-key="${data.id}">
        <input id="${data.id}" type="checkbox" >
        <label for="${data.id}" class="tick"></label>
        <span>${data.textValue}</span>
        <button class="delete">X</button>
    </li>`
    );
}

const saveTodo = document.querySelector('.btnAddTodo');
saveTodo.addEventListener('click', event => {
    event.preventDefault();
    const addTodoText = document.querySelector('.addTodo');

    const data = addTodoText.value.trim();

    const timeId = new Date().getTime();

    const singleTodo = {
        id: Date.now(),
        checkStatus: false,
        textValue: data
    };

    if(data != '') {
        localStorage.setItem(timeId, JSON.stringify(singleTodo));
        addTodoText.value = "";
        addTodoText.focus();
        getTodo(timeId);
    }
});
