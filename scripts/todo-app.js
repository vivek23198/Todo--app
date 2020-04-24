'use strict'


const  todos = getSavedTodos() 


// Filtered todo lists

const filters = {
    searchText:'',
    hideCompleted: false
}


// const todoJSON = localStorage.getItem('todos')
// if(todoJSON !== null){
//     notes = JSON.parse(todoJSON)
// }

// renderTodos(todos, filters)


renderTodos(todos, filters)

// Listener for todo text

document.querySelector('#new-todo').addEventListener('input', (e)=>{
        filters.searchText = e.target.value
        renderTodos(todos, filters)
})

// Add Todo in a todoLists

document.querySelector('#new-form').addEventListener('submit', (e)=>{
    
    const todoItem = e.target.elements.todoItem.value.trim()
    e.preventDefault()


    if(todoItem.length > 0){
        todos.push({id: uuidv4(),
            text: todoItem,
             completed:false})
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.todoItem.value = ''
    }

   
})

// hide Completed

document.querySelector('#hide-completed').addEventListener('change', (e)=>{
            filters.hideCompleted = e.target.checked
            renderTodos(todos, filters)
})
