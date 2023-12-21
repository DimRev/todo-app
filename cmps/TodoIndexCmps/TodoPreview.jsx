export function TodoPreview({ onToggleTodo, todo }) {
  return (
    <React.Fragment>
      <button className="toggle-todo-btn" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? 'active' : 'complete'}
      </button>
      <span className={todo.isDone ? 'active' : 'complete'}>{todo.todo}</span>
    </React.Fragment>
  )
}
