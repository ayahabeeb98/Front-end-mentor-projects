//TODO
//Theme toggle #1 ✅
// Add, Remove task #2 ✅
// Mark task as Completed #3 ✅
// Filter tasks (All, Active, Completed) #4 ✅
// Clear Completed task #5 ✅
// Drag and drop task to reorder

//#1
const root = document.documentElement;
const toggleBtn = document.querySelector('.btn-toggle');
const themeIcon = document.querySelector('#icon');

root.classList.add('dark-theme');

function toggleTheme() {
    let toggle = root.classList.contains('dark-theme');
    themeIcon.src = toggle ? './images/icon-moon.svg' : './images/icon-sun.svg';
    root.classList.toggle('light-theme');
    root.classList.toggle('dark-theme');
}

toggleBtn.addEventListener('click', toggleTheme);

//#2
//Add new Task

const addTaskForm = document.querySelector('.addTaskForm');
const task = document.querySelector('#todoItem');
const todoList = document.querySelector('.todo-list');

//For Filtering the List

const FILTER_MAP = {
    All: () => [...document.querySelectorAll(".todo-item")],
    Active: () => Array.from(document.querySelectorAll(".todo-item"))
        .filter(item=>!item.classList.contains('done')),
    Completed: () => [...document.querySelectorAll(".todo-item.done")]
};

let allItem = FILTER_MAP.All();
let activeItem = FILTER_MAP.Active();
let CompletedItem = FILTER_MAP.Completed();


function addTask(e) {
    e.preventDefault();
    let taskValue = task.value;

    const todoItem = document.createElement('LI');
    todoItem.setAttribute('class', 'todo-item');

    const statusBtn = document.createElement('BUTTON');
    statusBtn.setAttribute('class', 'btn btn-status');

    const statusText = document.createElement('SPAN');
    statusText.textContent = 'Task Status';
    statusText.setAttribute('class', 'visually-hidden');

    statusBtn.appendChild(statusText);


    const taskContent = document.createElement('P');
    taskContent.textContent = taskValue;

    const removeBtn = document.createElement('BUTTON');
    removeBtn.setAttribute('class', 'btn btn-remove');

    const removeText = document.createElement('SPAN');
    removeText.textContent = 'Remove task';
    removeText.setAttribute('class', 'visually-hidden');

    const crossIcon = document.createElement('IMG');
    crossIcon.src = "./images/icon-cross.svg";

    removeBtn.appendChild(removeText);
    removeBtn.appendChild(crossIcon);
    //Creat a new li item
    todoItem.appendChild(statusBtn);
    todoItem.appendChild(taskContent);
    todoItem.appendChild(removeBtn);

    todoList.insertBefore(todoItem, todoList.childNodes[0]);

    task.value = '';
    countRemainingTodos();
    updateTasks();
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

function updateTasks(){
    CompletedItem = FILTER_MAP.Completed();
    activeItem = FILTER_MAP.Active();
    allItem = FILTER_MAP.All();
}

function todoAction(e) {
    const targetEl = e.target;
    console.log(targetEl);

    if (targetEl.classList.contains('btn-status')) {
        //#3 Mark task as complete
        targetEl.parentElement.classList.toggle('done');
        updateTasks();
    } else if (targetEl.classList.contains('btn-remove')) {
        //Remove Task
        targetEl.parentElement.remove();
        countRemainingTodos();
        updateTasks();
    } else if (targetEl.tagName === "IMG") {
        //Remove Task
        targetEl.parentElement.parentElement.remove();
        countRemainingTodos();
        updateTasks();
    }


}

todoList.addEventListener('click', todoAction);

function addActive(e) {
    let elems = document.querySelector(".btn-action.active");
    if(elems !==null){
        elems.classList.remove("active");
    }
    e.target.className += " active";
}

//#4 Filter tasks
document.querySelectorAll('.btn-action').forEach((btn) => {

    btn.addEventListener('click',function (e) {
        addActive(e);
        let actionType = btn.dataset.action;
        todoList.innerHTML = '';
        switch (actionType) {
            case 'Active':
                    activeItem.forEach(item => todoList.appendChild(item));
                break;
            case 'Completed':
                    CompletedItem.forEach(item => todoList.appendChild(item));
                break;
            case 'All':
                    allItem.forEach(item => todoList.appendChild(item));
                break;
            case 'Clear':
                    CompletedItem = [];
                    allItem = [...activeItem];
                    allItem.forEach(item => todoList.appendChild(item));
                break;
            default:
                console.log('Something Went Wrong!');
        }
        countRemainingTodos();
    });

});