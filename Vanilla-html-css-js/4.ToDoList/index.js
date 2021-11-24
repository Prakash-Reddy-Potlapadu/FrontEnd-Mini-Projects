document.onload = renderToDoList();

// document.get;

function handleAddToDoItem(target) {
    const value = document.getElementById("todoinput").value;
    if (value) {
        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
        todoList.unshift(value);
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

    // todoList.splice(index, 1);
    // localStorage.setItem("todoList", JSON.stringify(todoList));
    // renderToDoList();
}

function handleDeleteItem(index) {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderToDoList();
}

function renderToDoList() {
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const todoListContainer = document.getElementById("todocontainer");
    while (todoListContainer.firstChild) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }
    //rendering list of items
    todoList.forEach((todoItem, index) => {
        const li = document.createElement("li");
        li.innerHTML = todoItem;

        const removeButton = document.createElement("BUTTON");
        removeButton.innerHTML = "Delete";
        removeButton.onclick = (e) => {
            e.stopPropagation();
            handleDeleteItem(index);
        };
        removeButton.classList.add("remove-button");

        const editButton = document.createElement("BUTTON");
        editButton.innerHTML = "Edit";
        editButton.onclick = (e) => {
            e.stopPropagation();
            handleEditItem(index);
        };
        editButton.classList.add("edit-button");

        li.appendChild(editButton);
        li.appendChild(removeButton);
        todoListContainer.appendChild(li);
    });
}
