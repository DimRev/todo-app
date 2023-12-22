const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoSearch } from '../cmps/TodoIndexCmps/TodoSearch.jsx'
import { TodoFilter } from '../cmps/TodoIndexCmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoIndexCmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoIndexCmps/TodoInput.jsx'

import { todoService } from '../services/todo.service.js'
import { utilService } from '../services/util.service.js'
import { userService } from '../services/user.service.js'

import {
  SET_TODOS,
  TOGGLE_TODO_ISDONE,
  ADD_TODO,
  CLEAR_COMPLETED_TODOS,
  SET_FILTERBY,
  SET_SEARCHWORD,
  ADD_ACTIVITY,
} from '../store/store.js'

export function TodoIndex() {
  const dispatch = useDispatch()

  const debounceSearch = useRef(utilService.debounce(onSearch, 500))

  const todos = useSelector((storeState) => storeState.todos)
  const filterBy = useSelector((storeState) => storeState.filterBy)
  const searchWord = useSelector((storeState) => storeState.searchWord)
  const user = useSelector((storeState) => storeState.loggedinUser)

  useEffect(() => {
    loadTodos()
  }, [filterBy, searchWord])

  function loadTodos() {
    todoService.query(filterBy, searchWord, user).then((todos) => {
      dispatch({ type: SET_TODOS, todos })
    })
  }

  function onToggleTodo(todo) {
    const toggledTodo = { ...todo, isDone: !todo.isDone }
    todoService
      .save(toggledTodo)
      .then((updatedTodo) => {
        dispatch({ type: TOGGLE_TODO_ISDONE, updatedTodo })
      })
      .then(() => {
        userService.addActivity('Toggled Todo').then((activities) => {
          dispatch({ type: ADD_ACTIVITY, activities })
        })
      })
  }

  function onAddTodo(newTodo) {
    newTodo = { ...todoService.getEmptyTodo(), todo: newTodo.todo, owner: user }
    todoService
      .save(newTodo)
      .then((addedTodo) => {
        dispatch({ type: ADD_TODO, addedTodo })
      })
      .then(() => {
        userService.addActivity('Added Todo').then((activities) => {
          dispatch({ type: ADD_ACTIVITY, activities })
        })
      })
  }

  function onFilterBy(filter) {
    dispatch({ type: SET_FILTERBY, filter })
  }

  function onSearch(searchWord) {
    dispatch({ type: SET_SEARCHWORD, searchWord })
  }

  function onClearComplete() {
    const completedTodoIds = todos.reduce((acc, todo) => {
      if (todo.isDone) return [...acc, todo._id]
      return acc
    }, [])
    todoService
      .removeButch(completedTodoIds)
      .then(() => {
        dispatch({ type: CLEAR_COMPLETED_TODOS, completedTodoIds })
      })
      .then(() => {
        userService
          .addActivity('Cleared Completed Todos')
          .then((activities) => {
            dispatch({ type: ADD_ACTIVITY, activities })
          })
      })
  }

  const sectionStyle = () => {
    if(!user) return { backgroundColor: '#ffffff', color: '#000000' }
    return { backgroundColor: user.backgroundColor || '#ffffff', color: user.textColor || '#000000' }
  }

  return (
    <section className="todo-index-page" style={sectionStyle()}>
      <TodoSearch onSearch={debounceSearch.current} />
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={todos} onToggleTodo={onToggleTodo} />
      <TodoFilter onFilterBy={onFilterBy} onClearComplete={onClearComplete} />
    </section>
  )
}
