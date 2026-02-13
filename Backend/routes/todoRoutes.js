const express = require('express')
const Todo = require('../models/todo')
const auth = require('../middleware/auth')

const router = express.Router()

// CREATE
router.post('/', auth, async (req, res) => {
  const todo = await Todo.create({
    name: req.body.name,
    user: req.user.id
  })
  res.json(todo)
})

// GET ALL (ONLY USER TODOS)
router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id })
  res.json(todos)
})

// UPDATE
router.put('/:id', auth, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  )
  res.json(todo)
})

// DELETE
router.delete('/:id', auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted successfully' })
})

module.exports = router
