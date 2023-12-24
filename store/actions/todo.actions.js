import { todoService } from '../../services/todo.service.js'

import {
  SET_TODOS,
  TOGGLE_TODO_ISDONE,
  ADD_TODO,
  CLEAR_COMPLETED_TODOS,
  SET_FILTERBY,
  SET_SEARCHWORD,
} from '../store/reducers/todo.reducer.js'

import { ADD_ACTIVITY } from '../store/reducers/user.reducer.js'

import { store } from '../store.js'

// function loadTodos() {
//   console.log('test');
//   todoService.query(filterBy, searchWord, user).then((todos) => {
//     dispatch({ type: SET_TODOS, todos })
//   })
// }

export function loadTodos() {
  const filterBy = store.getState().todoModule.filterBy
  const searchWord = store.getState().todoModule.searchWord
  const user = store.getState().userModule.loggedinUser

  return todoService.query(filterBy, searchWord, user).then((todos) => {
    store.dispatch({ type: SET_TODOS, todos })
  })
}

// function onToggleTodo(todo) {
//   const toggledTodo = { ...todo, isDone: !todo.isDone }
//   todoService
//     .save(toggledTodo)
//     .then((updatedTodo) => {
//       dispatch({ type: TOGGLE_TODO_ISDONE, updatedTodo })
//     })
//     .then(() => {
//       userService.addActivity('Toggled Todo').then((activities) => {
//         dispatch({ type: ADD_ACTIVITY, activities })
//       })
//     })
// }

export function toggleTodo(todo) {
  const toggledTodo = { ...todo, isDone: !todo.isDone }
  return todoService
    .save(toggledTodo)
    .then((updatedTodo) => {
      store.dispatch({ type: TOGGLE_TODO_ISDONE, updatedTodo })
    })
    .then(() => {
      userService.addActivity('Toggled Todo').then((activities) => {
        store.dispatch({ type: ADD_ACTIVITY, activities })
      })
    })
}

// function onAddTodo(newTodo) {
//   newTodo = { ...todoService.getEmptyTodo(), todo: newTodo.todo, owner: user }
//   todoService
//     .save(newTodo)
//     .then((addedTodo) => {
//       dispatch({ type: ADD_TODO, addedTodo })
//     })
//     .then(() => {
//       userService.addActivity('Added Todo').then((activities) => {
//         dispatch({ type: ADD_ACTIVITY, activities })
//       })
//     })
// }

export function addTodo(newTodo) {
  const user = store.getState().userModule.loggedinUser

  newTodo = { ...todoService.getEmptyTodo(), todo: newTodo.todo, owner: user }
  return todoService
    .save(newTodo)
    .then((addedTodo) => {
      store.dispatch({ type: ADD_TODO, addedTodo })
    })
    .then(() => {
      userService.addActivity('Added Todo').then((activities) => {
        store.dispatch({ type: ADD_ACTIVITY, activities })
      })
    })
}

// function onFilterBy(filter) {
//   dispatch({ type: SET_FILTERBY, filter })
// }

export function setFilter(filter) {
  store.dispatch({ type: SET_FILTERBY, filter })
}

// function onSearch(searchWord) {
//   dispatch({ type: SET_SEARCHWORD, searchWord })
// }

export function setSearchWord(searchWord) {
  store.dispatch({ type: SET_SEARCHWORD, searchWord })
}

// function onClearComplete() {
//   const completedTodoIds = todos.reduce((acc, todo) => {
//     if (todo.isDone) return [...acc, todo._id]
//     return acc
//   }, [])
//   todoService
//     .removeButch(completedTodoIds)
//     .then(() => {
//       dispatch({ type: CLEAR_COMPLETED_TODOS, completedTodoIds })
//     })
//     .then(() => {
//       userService
//         .addActivity('Cleared Completed Todos')
//         .then((activities) => {
//           dispatch({ type: ADD_ACTIVITY, activities })
//         })
//     })
// }

export function clearComplete() {
  const todos = store.getState().todoModule.todos
  const completedTodoIds = todos.reduce((acc, todo) => {
    if (todo.isDone) return [...acc, todo._id]
    return acc
  }, [])
  todoService
    .removeButch(completedTodoIds)
    .then(() => {
      store.dispatch({ type: CLEAR_COMPLETED_TODOS, completedTodoIds })
    })
    .then(() => {
      userService.addActivity('Cleared Completed Todos').then((activities) => {
        store.dispatch({ type: ADD_ACTIVITY, activities })
      })
    })
}
