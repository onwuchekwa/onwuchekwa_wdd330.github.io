import TodoTask from './utilities.js';

let textValue = document.querySelector('.addTodo');
let counter = document.querySelector('.counter');
const listContainer = document.querySelector('.todo-list');

let todoLists = [];
let taskTodo;

export default class LocalStorage {
    constructor(){}

    loadTodoList() {
        window.addEventListener('load', () => {
            const loadTaskList = JSON.parse(localStorage.getItem("itemList"));
            this.getAllTasks(loadTaskList);
        });
    }

    saveTodoList() {
        let timestamp = new Date();
        const text = textValue.value.trim(); 
        let status = false;
        taskTodo = new TodoTask(timestamp.getTime(), text, status);

        if(!text.length <= 0) {
            todoLists.push(taskTodo);
            localStorage.setItem("itemList", JSON.stringify(todoLists));
            this.addOneTask(taskTodo);
            this.manageTodoLists(todoLists.length -1);
            this.countTask();
            textValue.value = '';
            textValue.focus();
        }
    }

    addOneTask(task) {
        if(task.getStatus()) {
            listContainer.insertAdjacentHTML('beforeend', 
                `<li class="item">
                    <input type="checkbox" class="checkBox" checked>
                    <span class="strikeThrough spanText">${task.getContent()}</span>
                    <button class="deleteData">X</button>
                </li>`
            );
        } else { 
            listContainer.insertAdjacentHTML('beforeend', 
                `<li class="item">
                    <input type="checkbox" class="checkBox">
                    <span class="spanText">${task.getContent()}</span>
                    <button class="deleteData">X</button>
                </li>`
            );
        }
    }

    getAllTasks(allTask) {
        listContainer.innerHTML = "";
        todoLists.splice(0, todoLists.length);
        for(let i = 0; i < allTask.length; i++) {
            taskTodo = new TodoTask(allTask[i].id, allTask[i].content, allTask[i].status);
            todoLists.push(taskTodo);
            this.addOneTask(taskTodo);
            this.manageTodoLists(i);
        }
        this.countTask();
    }

    countTask() {
        counter.innerHTML = `${todoLists.length} tasks left`;
    }

    manageTodoLists(index) { 
        let checkBox = document.querySelectorAll('.checkBox');
        let spanText = document.querySelectorAll('.spanText');
        let deleteData = document.querySelectorAll('.deleteData');

        checkBox[index].addEventListener('click', () => {
            if(todoLists[index].status) {
                todoLists[index].status = false;
                spanText[index].classList.remove("strikeThrough");
                localStorage.setItem("itemList", JSON.stringify(todoLists));
            } else {
                todoLists[index].status = true;
                spanText[index].classList.add("strikeThrough");
                localStorage.setItem("itemList", JSON.stringify(todoLists));
            }
        });

        deleteData[index].addEventListener('click', () => {
            todoLists.splice(index, 1);
            localStorage.setItem("itemList", JSON.stringify(todoLists));
            let taskList = JSON.parse(localStorage.getItem("itemList"));
            this.getAllTasks(taskList);
        });
    }

    allTodoTasks() {
        const todoListData = JSON.parse(localStorage.getItem("itemList"));
        this.getAllTasks(todoListData);
    }

    activeTodoTasks() {
        const todoListData = JSON.parse(localStorage.getItem("itemList"));
        let listItemArray = [];
        for(let i = 0; i < todoListData.length; i++) {
            if(!todoListData[i].status) {
                taskTodo = new TodoTask(todoListData[i].id, todoListData[i].content, todoListData[i].status);
                listItemArray.push(taskTodo);
            }
        }
        this.getAllTasks(listItemArray);
    }

    completedTodoTasks() {
        const todoListData = JSON.parse(localStorage.getItem("itemList"));
        let listItemArray = [];
        for(let i = 0; i < todoListData.length; i++) {
            if(todoListData[i].status) {
                taskTodo = new TodoTask(todoListData[i].id, todoListData[i].content, todoListData[i].status);
                listItemArray.push(taskTodo);
            }
        }
        this.getAllTasks(listItemArray);
    }
}