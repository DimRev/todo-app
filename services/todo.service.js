import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

_createTodos()

export const todoService = {
  query,
  getById,
  save,
  remove,
  getEmptyTodo,
}

function query(filterBy) {
  // return axios.get(BASE_URL).then(res => res.data)
  return storageService.query(STORAGE_KEY).then((todos) => {
    console.log(filterBy);
    switch (filterBy) {
      case 'all':
        return todos
      case 'active':
        return todos.filter(todo => todo.isDone)
        case 'complete':
        return todos.filter(todo => !todo.isDone)
    }
  })
}
function getById(todoId) {
  return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
  // return Promise.reject('Not now!')
  return storageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
  if (todo._id) {
    return storageService.put(STORAGE_KEY, todo)
  } else {
    // when switching to backend - remove the next line
    todo.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, todo)
  }
}

function getEmptyTodo() {
  return {
    todo: '',
    isDone: '',
  }
}

function _createTodos() {
  storageService.query(STORAGE_KEY).then((todos) => {
    if (todos && todos.length) return
    else {
      let todo = { todo: 'Some random todo', isDone: false }
      todo.owner = {
        fullname: 'test',
        score: 10000,
        _id: '0uj8P',
      }
      storageService.post(STORAGE_KEY, todo).then(() => {
        let todo2 = { todo: 'Some random todo2', isDone: true }
        todo2.owner = {
          fullname: 'test',
          score: 10000,
          _id: '0uj8P',
        }
        storageService.post(STORAGE_KEY, todo2).then(() => {
          let todo3 = { todo: 'Some random todo3', isDone: false }
          todo3.owner = {
            fullname: 'test',
            score: 10000,
            _id: '0uj8P',
          }
          storageService.post(STORAGE_KEY, todo3)
        })
      })
    }
  })
}
