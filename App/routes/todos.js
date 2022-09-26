const express = require('express')
const router = express.Router()

const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById
} = require('../controllers/todosController.js')

// getting all
router.get('/', getTodos)

// getting one
router.get('/:id', getTodoById, getTodo)

// creating one
router.post('/', createTodo)

// updating one
router.patch('/:id', getTodoById, updateTodo)
 
// deleting one
router.delete('/:id', getTodoById, deleteTodo)

module.exports = router