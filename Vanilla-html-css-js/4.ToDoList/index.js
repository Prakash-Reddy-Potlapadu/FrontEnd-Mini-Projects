document.onload=renderToDoList()


function handleAddToDoItem(target) {
    const value = document.getElementById("todoinput").value;
    if (value) {
        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList.push(value);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderToDoList();
        document.getElementById("todoinput").value = "";
    }
}

function handleEditItem(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList"));

    const userInput = prompt("Enter Task to update:", todoList[index]);
    if (userInput) {
        todoList[index] = userInput;
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderToDoList();
    }


}

function handleDeleteItem(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderToDoList();
}

function renderToDoList() {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const todoListContainer = document.getElementById("todolistcontainer");

    //clear previously rendered items
    while (todoListContainer.firstChild) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }
    //rendering list of items
    todoList.forEach((todoItem, index) => {
        const li = document.createElement("li");
        li.innerHTML = todoItem;

        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = (e) => {
            e.stopPropagation();
            handleEditItem(index);
        };
        editButton.classList.add("edit-button");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Delete";
        removeButton.onclick = (e) => {
            e.stopPropagation();
            handleDeleteItem(index);
        };
        removeButton.classList.add("remove-button");

       const actionButtonContainer=document.createElement('span');
       actionButtonContainer.classList.add('action-button-container');

        actionButtonContainer.appendChild(editButton);
        actionButtonContainer.appendChild(removeButton);

        li.appendChild(actionButtonContainer);
        todoListContainer.appendChild(li);
    });
}
