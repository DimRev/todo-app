export function TodoPreview({ onToggleTodo, todo }) {
  return (
    <React.Fragment>
      <button className="toggle-todo-btn" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? 'done' : 'undone'}
      </button>
      <span className={todo.isDone ? 'done' : 'undone'}>{todo.todo}</span>
    </React.Fragment>
  )
}
