const { Link, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoPreview({ onToggleTodo, todo }) {
  const user = useSelector((storeState) => storeState.loggedinUser)
  return (
    <React.Fragment>
      <div className="todo-item-preview" onClick={() => onToggleTodo(todo)}>
        {todo.isDone ? '🟢' : '🔴'}
        <span className={todo.isDone ? 'complete' : 'active'}>{todo.todo}</span>
        {user && (
          <React.Fragment>
            <Link to={`/todo/${todo._id}`}>
              <button>Edit</button>
            </Link>
            <Link to={`/todo/details/${todo._id}`}>
              <button>Details</button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}
