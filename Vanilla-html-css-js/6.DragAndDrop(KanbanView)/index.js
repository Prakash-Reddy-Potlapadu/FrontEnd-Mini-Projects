// reference

window.addEventListener("load", handleWindowLoad);

let sourceListName = "";
// let destinationListName = "";

function handleWindowLoad() {
    renderLists();
    const todoContainer = document.getElementsByClassName("todo-container")[0];
    const inProgressContainer = document.getElementsByClassName("inprogress-container")[0];
    const doneContainer = document.getElementsByClassName("done-container")[0];
    if (todoContainer) {
        todoContainer.addEventListener("dragover", handleDragOver);
        todoContainer.addEventListener("drop", (e) => handleDrop(e, listItemNames.TODO));
    }
    if (inProgressContainer) {
        inProgressContainer.addEventListener("dragover", handleDragOver);
        inProgressContainer.addEventListener("drop", (e) => {
            handleDrop(e, listItemNames.INPROGRESS);
        });
    }
    if (doneContainer) {
        doneContainer.addEventListener("dragover", handleDragOver);
        doneContainer.addEventListener("drop", (e) => handleDrop(e, listItemNames.DONE));
    }
}

function getList(listName) {
    return JSON.parse(localStorage.getItem(listName)) || [];
}
function setList(listName, list) {
    return localStorage.setItem(listName, JSON.stringify(list || []));
}

function renderLists() {
    renderToDoList();
    renderInProgressList();
    renderDoneList();
}

function handleAddTask() {
    const input = document.getElementById("addtaskinput");

    if (input && input.value) {
        const todoList = getList(listItemNames.TODO);
        todoList.push(input.value);
        setList(listItemNames.TODO, todoList);
        const container = document.getElementsByClassName("todo-container")[0];
        renderListItem(input.value, container, listItemNames.TODO);
        input.value = "";
    }
}

function renderToDoList() {
    const todoList = getList(listItemNames.TODO);
    const container = document.getElementsByClassName("todo-container")[0];
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    if (todoList && todoList.length) {
        todoList.forEach((item) => {
            renderListItem(item, container, listItemNames.TODO);
        });
    }
}

function renderInProgressList() {
    const inProgressList = getList(listItemNames.INPROGRESS);
    const container = document.getElementsByClassName("inprogress-container")[0];
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    if (inProgressList && inProgressList.length) {
        inProgressList.forEach((item) => {
            renderListItem(item, container, listItemNames.INPROGRESS);
        });
    }
}

function renderDoneList() {
    const doneList = getList(listItemNames.DONE);
    const container = document.getElementsByClassName("done-container")[0];
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    if (doneList && doneList.length) {
        doneList.forEach((item) => {
            renderListItem(item, container, listItemNames.DONE);
        });
    }
}

function renderListItem(itemText, container, listName) {
    const li = document.createElement("li");
    li.innerHTML = itemText;
    li.classList.add("task-item");
    li.setAttribute("id", itemText);
    li.setAttribute("draggable", true);
    li.addEventListener("dragstart", (e) => handleDragStart(e, listName));
    container.appendChild(li);
}

function handleDrop(event, targetListName) {
    event.preventDefault();
    const destination = event.target;
    destinationListName = targetListName;
    const data = event.dataTransfer.getData("Text");
    const dragItem = document.getElementById(data);
    const dropItem = event.target;

    //drag and drop from different containers
    if (sourceListName !== destinationListName) {
        if (dropItem.nodeName !== "LI") {
            let sourceList = getList(sourceListName);
            let destinationList = getList(destinationListName);
            sourceList = sourceList.filter((item) => item !== dragItem.innerHTML);
            destinationList.push(dragItem.innerHTML);
            setList(sourceListName, sourceList);
            setList(destinationListName, destinationList);
            renderLists();
        } else {
            let sourceList = getList(sourceListName);
            let destinationList = getList(destinationListName);
            const destinationIndex = destinationList.findIndex((item) => item === dropItem.innerHTML);
            sourceList = sourceList.filter((item) => item !== dragItem.innerHTML);
            destinationList.splice(destinationIndex, 0, dragItem.innerHTML);
            setList(sourceListName, sourceList);
            setList(destinationListName, destinationList);
            renderLists();
        }
    } else {
        //drag and drop within same container
        if (dropItem.nodeName !== "LI") {
            let list = getList(sourceListName);
            list = list.filter((item) => item !== dragItem.innerHTML);
            list.push(dragItem.innerHTML);
            // destinationList.push(dragItem.innerHTML);
            setList(sourceListName, list);
            renderLists();
        } else {
            let list = getList(sourceListName);
            const destinationIndex = list.findIndex((item) => item === dropItem.innerHTML);
            list = list.filter((item) => item !== dragItem.innerHTML);
            list.splice(destinationIndex, 0, dragItem.innerHTML);
            setList(sourceListName, list);
            renderLists();
        }
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDragStart(event, listName) {
    event.dataTransfer.setData("Text", event.target.id);
    sourceListName = listName;
}

const listItemNames = {
    TODO: "todoList",
    INPROGRESS: "inProgressList",
    DONE: "doneList",
};




