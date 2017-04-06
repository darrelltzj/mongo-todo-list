// TODO. import TODO Model ;-)
const Todo = require('../models/todo')

var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/todo'

function create (params) {
  // create a new TODO and console log the response
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  if (!params.description || params.description == '') {
    params.description = 'default description'
  }
  if (!params.completed || params.completed == '') {
    params.completed = false
  }
  if (params.name.length >= 5) {
    params.save(function (err, data) {
      if (err) console.error(err)
      console.log(data)
      mongoose.disconnect()
    })
  }
  else {
    mongoose.disconnect()
    // return false
  }
}

function list () {
  // console log the list of all TODOs
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.find({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    }
    else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

function show (id) {
  // find the TODO with this id and console log it
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.find().where('_id').equals(id).exec(function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    }
    else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

function update (id, params) {
  // find the TODO with this id and update it's params. console log the result.
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  if (params.name.length >= 5) {
    Todo.findByIdAndUpdate(id, {$set: params}, {new: true}, function (err, data) {
      if (err) {
        console.error(err)
        mongoose.disconnect()
        // return false
      }
      else{
        console.log(data)
        mongoose.disconnect()
        // return true
      }
    })
  }
  else {
    mongoose.disconnect()
    // return false
  }
}

function destroy (id) {
  // find the TODO with this id and destroy it. console log success/failure.
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.findByIdAndRemove(id, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
      // return false
    }
    else{
      console.log(data)
      mongoose.disconnect()
      // return true
    }
  })
}

function destroyAll () {
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.remove({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
      // return false
    }
    else{
      console.log(data)
      mongoose.disconnect()
      // return true
    }
  })
}

function quit () {
  mongoose.disconnect()
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll,
  quit
}

// var testParams = new Todo({
//   name: 'testing',
//   description: 'test description',
//   completed: false
// })
//
// var test2Params = {
//   name: 'testing2',
//   description: 'test2 description',
//   completed: true
// }
//
// var theId = '58e651429c916709dfce48df'
//
// console.log(create(testParams))
// console.log(list())
// console.log(show(theId))
// console.log(update (theId, test2Params))
// console.log(destroy (theId))
// console.log(destroyAll())
