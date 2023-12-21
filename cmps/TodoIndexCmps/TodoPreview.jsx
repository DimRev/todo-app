export function TodoPreview({ onToggleTodo, todo }) {
  return (
    <React.Fragment>
      <button className="toggle-todo-btn" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? 'complete' : 'active'}
      </button>
      <span className={todo.isDone ? 'complete' : 'active'}>{todo.todo}</span>
    </React.Fragment>
  )
}
