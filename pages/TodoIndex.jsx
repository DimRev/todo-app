const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoFilter } from '../cmps/TodoIndexCmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoIndexCmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoIndexCmps/TodoInput.jsx'

import { todoService } from '../services/todo.service.js'

import {
  SET_TODOS,
  TOGGLE_TODO_ISDONE,
  ADD_TODO,
  CLEAR_COMPLETED_TODOS,
  SET_FILTERBY,
} from '../store/store.js'

export function TodoIndex() {
  const dispatch = useDispatch()

  const todos = useSelector((storeState) => storeState.todos)
  const filterBy = useSelector((storeState) => storeState.filterBy)

  useEffect(() => {
    loadTodos()
  }, [filterBy])

  function loadTodos() {
    todoService.query(filterBy).then((todos) => {
      dispatch({ type: SET_TODOS, todos })
    })
  }

  function onToggleTodo(todo) {
    const toggledTodo = { ...todo, isDone: !todo.isDone }
    todoService.save(toggledTodo).then((updatedTodo) => {
      dispatch({ type: TOGGLE_TODO_ISDONE, updatedTodo })
    })
  }

  function onAddTodo(newTodo) {
    newTodo = { ...todoService.getEmptyTodo(), todo: newTodo.todo }
    todoService.save(newTodo).then((addedTodo) => {
      dispatch({ type: ADD_TODO, addedTodo })
    })
  }

  function onFilterBy(filter) {
    dispatch({ type: SET_FILTERBY, filter })
  }

  function onClearComplete() {
    const completedTodoIds = todos.reduce((acc, todo) => {
      if (todo.isDone) return [...acc, todo._id]
      return acc
    }, [])
    todoService.removeButch(completedTodoIds).then(() => {
      dispatch({ type: CLEAR_COMPLETED_TODOS, completedTodoIds })
    })
  }

  return (
    <section className="todo-index-page">
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={todos} onToggleTodo={onToggleTodo} />
      <TodoFilter onFilterBy={onFilterBy} onClearComplete={onClearComplete} />
    </section>
  )
}
