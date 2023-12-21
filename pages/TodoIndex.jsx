const { useState, useEffect } = React

import { TodoFilter } from '../cmps/TodoIndexCmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoIndexCmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoIndexCmps/TodoInput.jsx'

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
      console.log(todos);
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

  function onAddTodo(newTodo) {
    todoService.save(newTodo).then((addedTodo) =>{
      setTodos((prevTodos) => [addedTodo, ...prevTodos])
    })
  }

  return (
    <section className="todo-index-page">
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={todos} onToggleTodo={onToggleTodo} />
      <TodoFilter />
    </section>
  )
}
