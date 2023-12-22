const { Link, NavLink } = ReactRouterDOM

export function TodoPreview({ onToggleTodo, todo }) {
  return (
    <React.Fragment>
      <button className="toggle-todo-btn" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? 'complete' : 'active'}
      </button>
      <Link to={`/todo/${todo._id}`}><button>Edit</button></Link>
      <Link to={`/todo/details/${todo._id}`}><button>Details</button></Link>
      <span className={todo.isDone ? 'complete' : 'active'}>{todo.todo}</span>
    </React.Fragment>
  )
}
