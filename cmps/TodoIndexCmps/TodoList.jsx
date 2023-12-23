import { TodoPreview } from './TodoPreview.jsx'
export function TodoList({ todos, onToggleTodo }) {
  if (!todos) return
  return (
    <section className="todo-list-section">
      <div className="todo-list-frame">
        {todos.map((todo) => (
          <div
            className={`todo-list-item ${todo.isDone ? 'complete' : 'active'}`}
            key={todo._id}>
            <TodoPreview onToggleTodo={onToggleTodo} todo={todo} />
          </div>
        ))}
      </div>
    </section>
  )
}
