import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

const demoTodos = [
  {
    _id: utilService.makeId(),
    todo: 'Some random todo1',
    isDone: false,
    owner: {
      fullname: 'demoData',
      score: 10000,
      _id: 'demoData',
    },
  },
  {
    _id: utilService.makeId(),
    todo: 'Some random todo2',
    isDone: false,
    owner: {
      fullname: 'demoData',
      score: 10000,
      _id: 'demoData',
    },
  },
  {
    _id: utilService.makeId(),
    todo: 'Some random todo3',
    isDone: false,
    owner: {
      fullname: 'demoData',
      score: 10000,
      _id: 'demoData',
    },
  },
]

_createTodos()

export const todoService = {
  query,
  getById,
  save,
  remove,
  removeButch,
  getEmptyTodo,
}

function query(filterBy, searchWord, user) {
  // return axios.get(BASE_URL).then(res => res.data)
  return storageService.query(STORAGE_KEY, user).then((todos) => {
    let totalTodos = user ? todos.filter((todo) => user._id === todo.owner._id) : todos.filter((todo) => 'demoData' === todo.owner._id)
    let filteredTodos
    switch (filterBy) {
      case 'all':
        filteredTodos = [...totalTodos]
        break
      case 'active':
        filteredTodos = totalTodos.filter((todo) => !todo.isDone)
        break
      case 'complete':
        filteredTodos = totalTodos.filter((todo) => todo.isDone)
        break
    }
    if (searchWord) {
      const regExp = new RegExp(searchWord, 'i')
      filteredTodos = filteredTodos.filter((todo) => regExp.test(todo.todo))
    }
    return { totalTodos, filteredTodos }
  })
}
function getById(todoId) {
  return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
  // return Promise.reject('Not now!')
  console.log(todoId)
  return storageService.remove(STORAGE_KEY, todoId)
}

function removeButch(todoIds) {
  // return Promise.reject('Not now!')
  return storageService.removeBatch(STORAGE_KEY, todoIds)
}

function save(todo) {
  if (todo._id) {
    return storageService.put(STORAGE_KEY, todo)
  } else {
    // when switching to backend - remove the next line
    return storageService.post(STORAGE_KEY, todo)
  }
}

function getEmptyTodo() {
  return {
    todo: '',
    isDone: false,
  }
}

function _createTodos() {
  let todos = utilService.loadFromStorage(STORAGE_KEY)
  if (!todos || !todos.length) {
    todos = []
    utilService.saveToStorage(STORAGE_KEY, demoTodos)
  }
}
