const { useState, useEffect } = React

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoInput.jsx'

import { todoService } from '../services/todo.service.js'

export function TodoIndex() {
  const [todos, setTodos] = useState(null)
  const [filterBy, onFilterBy] = useState(null)
  const [todoCount, setTodoCount] = useState(0)

  useEffect(() => {
    loadTodos()
  }, [])

  function loadTodos() {
    todoService.query().then((todos) => {
      setTodos(todos)
    })
  }

  function onToggleTodo(todo) {
    const toggledTodo = { ...todo, isDone: !todo.isDone }
    todoService.save(toggledTodo).then((updatedTodo) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          updatedTodo._id === todo._id ? updatedTodo : todo
        )
      )
    })
  }

  return (
    <section className="todo-index-page">
      <TodoInput />
      <TodoList todos={todos} onToggleTodo={onToggleTodo} />
      <TodoFilter />
    </section>
  )
}
