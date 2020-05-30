import LocalStorage from './ls.js';

const saveTodo = document.querySelector('.btnAddTodo');
const btnAll = document.querySelector('.btnAll');
const btnActive = document.querySelector('.btnActive');
const btnCompleted = document.querySelector('.btnComplete');

const todoList = new LocalStorage();

todoList.loadTodoList();

saveTodo.addEventListener('click', () => {
    todoList.saveTodoList();
});

btnAll.addEventListener('click', () => {
    todoList.allTodoTasks();
    btnAll.classList.add('active');
    btnAll.classList.remove('inActive');
    btnActive.classList.remove('active');
    btnActive.classList.add('inActive');
    btnCompleted.classList.remove('active');
    btnCompleted.classList.add('inActive');
});

btnActive.addEventListener('click', () => {
    todoList.activeTodoTasks();
    btnActive.classList.add('active');
    btnActive.classList.remove('inActive');
    btnAll.classList.remove('active');
    btnAll.classList.add('inActive');
    btnCompleted.classList.remove('active');
    btnCompleted.classList.add('inActive');
});

btnCompleted.addEventListener('click', () => {
    todoList.completedTodoTasks();
    btnCompleted.classList.add('active');
    btnCompleted.classList.remove('inActive');
    btnAll.classList.remove('active');
    btnAll.classList.add('inActive');
    btnActive.classList.remove('active');
    btnActive.classList.add('inActive');
});