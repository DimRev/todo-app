const { Link, NavLink } = ReactRouterDOM

export function TodoPreview({ onToggleTodo, todo }) {
  return (
    <React.Fragment>
      <div className="todo-item-preview" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? '🟢' : '🔴'}
      <span className={todo.isDone ? 'complete' : 'active'}>{todo.todo}</span>
      <Link to={`/todo/${todo._id}`}><button>Edit</button></Link>
      <Link to={`/todo/details/${todo._id}`}><button>Details</button></Link>
      </div>
    </React.Fragment>
  )
}
