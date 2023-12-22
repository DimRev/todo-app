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
      fullname: 'test',
      score: 10000,
      _id: '0uj8P',
    },
  },
  {
    _id: utilService.makeId(),
    todo: 'Some random todo2',
    isDone: false,
    owner: {
      fullname: 'test',
      score: 10000,
      _id: '0uj8P',
    },
  },
  {
    _id: utilService.makeId(),
    todo: 'Some random todo3',
    isDone: false,
    owner: {
      fullname: 'test',
      score: 10000,
      _id: '0uj8P',
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

function query(filterBy, searchWord) {
  // return axios.get(BASE_URL).then(res => res.data)
  return storageService.query(STORAGE_KEY).then((todos) => {
    let filteredTodos
    switch (filterBy) {
      case 'all':
        filteredTodos = [...todos]
        break
      case 'active':
        filteredTodos = todos.filter((todo) => !todo.isDone)
        break
      case 'complete':
        filteredTodos = todos.filter((todo) => todo.isDone)
        break
    }
    if (searchWord) {
      const regExp = new RegExp(searchWord, 'i')
      filteredTodos = filteredTodos.filter(todo => regExp.test(todo.todo))
  }
    return filteredTodos
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
  let notes = utilService.loadFromStorage(STORAGE_KEY)
  if (!notes || !notes.length) {
    notes = []
    utilService.saveToStorage(STORAGE_KEY, demoTodos)
  }
}
