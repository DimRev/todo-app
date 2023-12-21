export function TodoList({ todos, onToggleTodo }) {
  if (!todos) return
  return (
    <section className="todo-list-section">
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <button
              className="toggle-todo-btn"
              onClick={() => onToggleTodo(todo)}>
              {todo.isDone ? 'done' : 'undone'}
            </button>
            <span className={todo.isDone ? 'done' : 'undone'}>{todo.todo}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
