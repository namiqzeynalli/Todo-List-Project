const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const cardBodyOne = document.querySelector('.card-body-one');
const cardBodyTwo = document.querySelector('.card-body-two');
const clearButton = document.querySelector('#clearButton');
const todoSearch = document.querySelector('#todoSearch');

let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    cardBodyTwo.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",removeAllTodos);
    todoSearch.addEventListener("keyup",filter);
}

function filter(e){
    const inputValue = e.target.value.toLowerCase().trim();
    const todoLists = document.querySelectorAll(".list-item");
    
    if(todoLists.length > 0){
        todoLists.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(inputValue)){
                todo.style.display = "flex";
            }
            else{
                todo.style.display = "none";
            }
        })
}
else{
    showAlertForNull("Axtarış etmək üçün ən az bir todo olmalıdır!")
}}
function removeAllTodos(){
    const todosList = document.querySelectorAll(".list-item");
    if(todosList.length > 0){
        todosList.forEach(function(todos){
            todos.remove();
        });
        localStorage.clear();
        showAlertForFull("Bütün Todolar silindi.");
    }
    else{
        showAlertForNull("Silmək üçün Todo yoxdur!");
    }
}

function removeTodoToUI(e){
    if(e.target.className === "fa-solid fa-trash"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlertForFull("Todo silindi.");
    };
    e.preventDefault();
}

function removeTodoToStorage(removeTodo){
    checkTodoFromLocalStorage();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function pageLoaded(){
    checkTodoFromLocalStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText === null || inputText === ""){
        showAlertForNull("Zəhmət olmasa Todo əlavə edin!");
    }
    else {
        addTodoToUI(inputText);
        addTodoToLocalStorage(inputText);
        showAlertForFull("Todo əlavə olundu.");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){

const li = document.createElement("li");
li.className = "list-item";
li.textContent = newTodo;
li.style.display = "flex";
li.style.justifyContent = "space-between";
li.style.padding = "10px";
li.style.border = "1px solid grey";
li.style.borderRadius = "5px";
li.style.margin = "0 20px"

const a = document.createElement('a');
a.href = "#";
a.className = "delete-item";

const i = document.createElement('i');
i.className = "fa-solid fa-trash";
i.style.color = "red";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

addInput.value = "";
}

function addTodoToLocalStorage(newTodo) {
    checkTodoFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodoFromLocalStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlertForNull(message){
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.textContent = message;
    alertDiv.style.display = "flex";
    alertDiv.style.padding = "10px 10px 10px 20px";
    alertDiv.style.backgroundColor = "#fff3cd";
    alertDiv.style.fontSize = "16px";
    alertDiv.style.margin = "0 20px 40px";

    cardBodyOne.appendChild(alertDiv);

    setTimeout(function() {
        alertDiv.remove();
    },2500);
}

function showAlertForFull(message){
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.textContent = message;
    alertDiv.style.display = "flex";
    alertDiv.style.padding = "10px 10px 10px 20px";
    alertDiv.style.backgroundColor = "#d4edda";
    alertDiv.style.fontSize = "16px";
    alertDiv.style.margin = "0 20px 40px";

    cardBodyOne.appendChild(alertDiv);

    setTimeout(function() {
        alertDiv.remove();
    },2500);
}