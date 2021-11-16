const form = document.querySelector('form');
const todoItem = document.querySelector('.todo');
const ul = document.querySelector('ul');
let listToDos = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    addElemListToDo(todoItem.value.trim())
})

function addElemListToDo(todo){
    if(todo !== ''){
        const objToDo = {
            todo: todo,
            isDone: false
        }; 
        listToDos.push(objToDo);
        setToDoLocalStorage(listToDos)
        todoItem.value = '';
    }
}

function displayToDoList(list){
    ul.innerHTML = '';

    list.forEach( (elem, index) => {
         const html = `
             <li class="${elem.isDone ? 'checked' : ''}" id=${index}>
                 <input title="Concluir Tarefa" type="checkbox" class="check" ${elem.isDone ? 'checked' : null} /> ${elem.todo}
                 <button title="Excluir Tarefa" class="trash">&#10006;</button>
            </li>   
        `;   
        ul.insertAdjacentHTML('beforeend', html);    
    });
}

function setToDoLocalStorage(list) {
    localStorage.setItem('todos', JSON.stringify(list));
    displayToDoList(list);
}

function getToDoLocalStorage() {
    const getListToDo = localStorage.getItem('todos');
    if (getListToDo) {
        listToDos = JSON.parse(getListToDo);
      displayToDoList(listToDos);
    }
}

function updateStatusToDo(id) {
    listToDos.forEach( (elem, index) => {
      if (index == id) {
        elem.isDone = !elem.isDone;
      }
    });  
    setToDoLocalStorage(listToDos);
  }
  
function trashToDo(id) {
    listToDos = listToDos.filter( (elem, index) => index != id);
    setToDoLocalStorage(listToDos);
}

ul.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.type === 'checkbox') {
        updateStatusToDo(e.target.parentElement.getAttribute('id'));
    }
  
    if (e.target.classList.contains('trash')) {
        let del = confirm('Deseja realmente remover essa tarefa?')
        del ? trashToDo(e.target.parentElement.getAttribute('id')) : '';
    }
});

window.addEventListener('load', _ => {
    todoItem.focus();
    getToDoLocalStorage()
})
