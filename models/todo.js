// Mongoose Schema and Models goes here
var mongoose = require('mongoose')

var todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: Boolean
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
