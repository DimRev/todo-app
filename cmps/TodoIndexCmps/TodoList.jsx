import { TodoPreview } from './TodoPreview.jsx'
export function TodoList({ todos, onToggleTodo }) {
  if (!todos) return
  return (
    <section className="todo-list-section">
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <TodoPreview onToggleTodo={onToggleTodo} todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
