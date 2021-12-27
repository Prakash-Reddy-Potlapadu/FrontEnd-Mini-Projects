window.addEventListener("load", handleWindowLoad);

function handleWindowLoad() {
    //     localStorage.setItem("todoList", JSON.stringify([]));
    //     localStorage.setItem("inProgressList", JSON.stringify([]));
    //     localStorage.setItem("doneList", JSON.stringify([]));
    renderToDoList();
}

function getTodoList() {
    return JSON.parse(localStorage.getItem("todoList"));
}
function setTodoList(list) {
    return localStorage.setItem("todoList", JSON.stringify(list));
}
function getInProgressList() {
    return JSON.parse(localStorage.getItem("inProgressList"));
}
function setInProgressList(list) {
    return localStorage.setItem("inProgressList", JSON.stringify(list));
}
function getDoneListList() {
    return JSON.parse(localStorage.getItem("doneList"));
}
function setDoneList(list) {
    return localStorage.setItem("doneList", JSON.stringify(list));
}

function handleTaskInputChange(e) {
    taskText = e.target.value;
}

function handleAddTask() {
    const input = document.getElementById("addtaskinput");
    const todoList = getTodoList();
    input.value && todoList.push(input.value);
    setTodoList(todoList);
    input.value = "";
    renderToDoList();
}

function renderToDoList() {
    const todoList = getTodoList();
    if (todoList.length) {
        todoList.forEach((item) => {
            renderListItem(item);
        });
    }
}

function renderListItem(itemText) {
    // const todoItemText = todoList[todoList.length - 1];
    const li = document.createElement("li");
    li.innerHTML = itemText;
    li.classList.add("task-item");
    const todoContainer = document.getElementsByClassName("todo-container")[0];
    todoContainer.appendChild(li);
}
