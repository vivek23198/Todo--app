'use strict'


// Fetch existing todos from localStorage

const getSavedTodos = function(){
    const todosJSON = localStorage.getItem('todos')
   
    try{
        return todosJSON ? JSON.parse(todosJSON): []
    }catch (e){
        return []
    }
}


// save Todos to localStorage 

const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id)=>{
    const todoIndex = todos.findIndex((todo)=>{
        return todo.id === id
    })

    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo

const toggleTodo = (id)=>{
    const todo = todos.find((todo)=>{
        return todo.id === id
    })
    if(todo !== undefined){
        todo.completed = !todo.completed
    }
}


// Render application todos based on filters
   
const renderTodos = (todos, filters)=>{
    const filteredtodos = todos.filter((todo)=>{
        const searchTextMatch =  todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

        const inCompleteTodos = filteredtodos.filter((todo)=>{
            return !todo.completed
        })

    document.querySelector('#filtered-todo').innerHTML = ''

    document.querySelector('#filtered-todo').appendChild(generateSummaryDOM(inCompleteTodos))


    if(filteredtodos.length > 0){
        filteredtodos.forEach((todo)=>{  
            document.querySelector('#filtered-todo').appendChild(generateTodoDOM(todo))
        })
    }
}

// Get the DOM elements for an individual note

const generateTodoDOM = function(todo){
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //Setup todo  checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', ()=>{
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //Setup the todo text

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)


      // Setup container 

      todoEl.classList.add('list-item')
      containerEl.classList.add('list-item__container')
      todoEl.appendChild(containerEl)
  

    // Setup the remove button

    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', ()=>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
  
    return todoEl
}

// Get the DOM elements for list Summary 

const generateSummaryDOM = function(inCompleteTodos){
    const para = document.createElement('p')
    const plural = inCompleteTodos.length === 1 ? '':'s'

    para.classList.add('list-title')
    console.log(inCompleteTodos)
    let lengthTodo = 0
    inCompleteTodos.forEach((todo)=>{
        if(todo.completed === false){
             lengthTodo = lengthTodo + 1
        }
    })
    para.textContent = `You have ${lengthTodo} todo${plural} left`
    return para
}