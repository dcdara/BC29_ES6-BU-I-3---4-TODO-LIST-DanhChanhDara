
const todoInput = document.getElementById("newTask");
const todoBtn = document.getElementById("addItem");
const todoList = document.getElementById("todo");
const todoLi = document.createElement("li");
const filterDown = document.getElementById("two");
const filterUp = document.getElementById("three");
const completedTasksHolder = document.getElementById("completed");

const addTodo = (event) => {
  event.preventDefault();
  const todoLi = document.createElement("li");
  todoLi.innerText = todoInput.value;
  todoLi.classList.add("ListItem");
  todoList.appendChild(todoLi);
  saveLocalTodos(todoInput.value);
  getLocalTodos();
  todoInput.value = "";
};

const deleteCheck = (event) => {
  const item = event.target;
  if (item.classList[0] === "delete") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", ()=> {
      todo.remove();
    });
  }
};

const completeTodo = (event) => {
  const item = event.target;

  if (item.classList[0] === "complete") {
    const todo = item.parentElement;
    completedTasksHolder.appendChild(todo);
  }
};


const sortUP = document.getElementById("two");
const sortUpfc = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  getAllTodoStorage(todos);
  getLocalTodos();
};

const sortDown = document.getElementById("three");
const sortDwnfc = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.sort((a, b) => {
    return a < b ? 1 : -1;
  });
  getAllTodoStorage(todos);
  getLocalTodos();
};


const getAllTodoStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todoList.innerHTML = "";
  todos.forEach((todo) => {

    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo");
    todoList.appendChild(todoLi);

    const completeBtn = document.createElement("div");
    completeBtn.innerHTML = '<i class="fa fa-check"></i>';
    completeBtn.classList.add("complete");
    todoLi.appendChild(completeBtn);

    const trashBtn = document.createElement("div");
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add("delete");
    todoLi.appendChild(trashBtn);
  });
};

const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
completedTasksHolder.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeTodo);
sortUP.addEventListener("click", sortUpfc);
sortDown.addEventListener("click", sortDwnfc);
