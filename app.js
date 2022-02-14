const button = document.querySelector(".button");
const input = document.querySelector(".input");

const list = document.querySelector(".todoList");
const container = document.querySelector('.todo-container');

button.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', getTodos("none"));
function addTodo(event){
    getTodos(event);
    input.value = "";
}

function saveLocal(inputValue, complete= "uncomplete"){
    let todos = JSON.parse(localStorage.getItem('task')) || [];
    todos.push({inputValue, complete});
    localStorage.setItem('task', JSON.stringify(todos));
}


function getTodos(event="none"){

    if(event!="none")
        event.preventDefault();
    if(input.value!=""){
        saveLocal(input.value);
    }

    list.innerHTML = "";
    let todos = JSON.parse(localStorage.getItem('task')) || [];
    todos.forEach((element, id) => {
        let todo = document.createElement('li');
        let content = document.createElement('p');
        content.innerText = `${element.inputValue}`;
        content.classList.add('todo-content');
        
        if(element.complete == "complete"){
            todo.classList.add('todo-done');
        }

        todo.appendChild(content);
        let buttons = createButtons();
        todo.appendChild(buttons);
        todo.classList.add('todo');
        list.appendChild(todo);
        container.appendChild(list);
    });
}

function createButtons(){
    let ul = document.createElement('ul');
    let checkLi = document.createElement('li');
    let deleteLi = document.createElement('li');

    let buttonCheck = document.createElement('button');
    let buttonDelete = document.createElement('button');

    buttonCheck.innerHTML = "<i class='fas fa-check'></i>";
    buttonCheck.classList.add('btn-concluir');
    checkLi.appendChild(buttonCheck);
    checkLi.classList.add('button-li');
    ul.appendChild(checkLi);

    buttonDelete.innerHTML = '<i class="fas fa-times"></i>';
    buttonDelete.classList.add('btn-deletar');
    deleteLi.appendChild(buttonDelete);
    deleteLi.classList.add('button-li');
    ul.appendChild(deleteLi);

    ul.classList.add('todo-buttons');
    return ul;
}

list.addEventListener('click', deleteCheck);

function deleteCheck(e){
    // e.preventDefault();
    
    const target = e.target.parentNode;
    if(target.classList.contains('btn-concluir'))
        checkTodo(target);
    if(target.classList.contains('btn-deletar'))
        deleteTodo(target);
}

function checkTodo(target){
    const todo = target.parentElement.parentElement.parentElement;
    todo.classList.toggle('todo-done');
    let todos =JSON.parse(localStorage.getItem('task'));
    
    const tasks = document.querySelectorAll('.todo');
    
      tasks.forEach((element, id) => {
         if(tasks[id] == todo){
             if(todos[id].complete == "uncomplete"){
                 todos[id].complete ="complete";
              }
             else{
                 todos[id].complete = "uncomplete"
             }            
         }
      });

     localStorage.setItem('task',JSON.stringify(todos));
    
}

function deleteTodo(target){
    const todo = target.parentElement.parentElement.parentElement;
    let todos =JSON.parse(localStorage.getItem('task')) || [];
    let index;
    const todoIndex = todo.children[0].innerText;

    for(let i=0; i< todos.length; i++){
        if(todos[i].inputValue == todoIndex)
            index = i;
    }
    
    todos.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(todos));
    todo.remove();
}

//tentar colocar um id;