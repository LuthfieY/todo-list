const Todo = require('../models/todos.js')

const  getTodos =  (async(req, res) => {
    try { 
        const todos = await Todo.find()
        res.json(todos) // send the todos as JSON
    } catch (err) {
       res.status(500).json({ message: err.message }) // if there is an error, send a 500 status code and the error message
    }
})

const getTodo = ((req, res) => {
    res.json(res.todo) // send the todo as JSON
})

const createTodo = (async (req, res) => {
    const todo = new Todo({ // create a new Todo object
        task: req.body.task
    })

    try {
        const newTodo = await todo.save() // save the new Todo object to the database
        res.status(201).json(newTodo) // send the new todo as JSON
    } catch (err) {
        res.status(400).json({ message: err.message }) // if there is an error, send a 400 status code and the error message
    }
})

const updateTodo = (async (req, res)=>{
    if (req.body.task != null) { // if the task is not null
        res.todo.task = req.body.task // set the task to the task in the request body
    }
    try {
        const updatedTodo = await res.todo.save() // save the updated todo to the database
        res.json(updatedTodo) // send the updated todo as JSON
    } catch (err) { 
        res.status(400).json({ message: err.message })  
    }
})

const deleteTodo = (async (req, res) => {
    try {
        await res.todo.remove() // remove the todo from the database
        res.json({ message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware function to get a todo by ID
async function getTodoById(req, res, next) { 
    let todo

    try{
        todo = await Todo.findById(req.params.id) // find todo by the id in the URL
        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.todo = todo // set the todo to the response object
    next()
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById
}