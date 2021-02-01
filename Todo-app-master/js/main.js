//TODO
//Theme toggle #1
// Add, Remove task #2
// Mark task as Completed #3
// Filter tasks (All, Active, Completed) #4
// Clear Completed task #5

//#1
const root = document.documentElement;
const toggleBtn = document.querySelector('.btn-toggle');
const themeIcon = document.querySelector('#icon');

root.classList.add('light-theme');

function toggleTheme() {
    let toggle = root.classList.contains('light-theme');
    themeIcon.src = toggle ? './images/icon-sun.svg' : './images/icon-moon.svg';
    root.classList.toggle('light-theme');
    root.classList.toggle('dark-theme');
}

toggleBtn.addEventListener('click', toggleTheme);

//#2
//Add new Task

const addTaskForm = document.querySelector('.addTaskForm');
const task = document.querySelector('#todoItem');
const todoList = document.querySelector('.todo-list');

function addTask(e) {
    e.preventDefault();
    let taskValue = task.value;

    const todoItem = document.createElement('LI');
    todoItem.setAttribute('class', 'todo-item');

    const statusBtn = document.createElement('BUTTON');
    statusBtn.setAttribute('class', 'btn btn-status');

    const taskContent = document.createElement('P');
    taskContent.textContent = taskValue;

    const removeBtn = document.createElement('BUTTON');
    removeBtn.setAttribute('class', 'btn btn-remove');

    const crossIcon = document.createElement('IMG');
    crossIcon.src = "./images/icon-cross.svg";

    removeBtn.appendChild(crossIcon);
    //Creat a new li item
    todoItem.appendChild(statusBtn);
    todoItem.appendChild(taskContent);
    todoItem.appendChild(removeBtn);

    todoList.insertBefore(todoItem, todoList.childNodes[0]);

    task.value = '';
    countRemainingTodos()
}

addTaskForm.addEventListener('submit', addTask);

//Count how many tasks
const tasksCounter = document.querySelector('.remainingTasks');

function countRemainingTodos() {
    let itemsLeft = [...document.querySelectorAll(".todo-item")].length;

    if (!itemsLeft) {
        tasksCounter.textContent = "0 items left";
    } else if (itemsLeft === 1) {
        tasksCounter.textContent = `1 item left`;
    } else {
        tasksCounter.textContent = `${itemsLeft} items left`;
    }
}

function todoAction(e) {
    const targetEl = e.target;
    console.log(targetEl);

    if (targetEl.classList.contains('btn-status')) {
        //Mark task as complete
        targetEl.parentElement.classList.toggle('done');
    } else if (targetEl.classList.contains('btn-remove')) {
        //Remove Task
        targetEl.parentElement.remove();
        countRemainingTodos()
    } else if (targetEl.tagName === "IMG") {
        //Remove Task
        targetEl.parentElement.parentElement.remove();
        countRemainingTodos()
    }


}

todoList.addEventListener('click', todoAction)
