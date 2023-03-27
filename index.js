const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");


const showMessage = (text, status) => {
    // messageElement.textContent = "Todo is Created";
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = " ";
        messageElement.classList.remove(`bg-${status}`);
    }, 1500)
}


//CreateTodo:
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash">    </i> </button> </span>
    `;

    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
};

//deletetodo:

const deleteTodo = (event) => {
    //console.log("Deleted");
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    //console.log(selectedTodo);
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted", "danger");

    let todos = addTodosLocalStorage();
    todos = todos.filter((todo) => todo.todoId != selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));

};


//Check or get Local Storage Value:
const addTodosLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
}


//Add todo:
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    //console.log(todoInput.value);


    //unique id:
    const todoId = Date.now().toString();
    //console.log(todoId);


    createTodo(todoId, todoValue);

    showMessage("Todo is added", "success");


    //Add todo to local storage:
    const todos = addTodosLocalStorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = " ";
};

//Loading todos:

const loadTodos = () => {
    console.log("Loaded");
    const todos = addTodosLocalStorage();

    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};


//Adding Listeners:
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);