const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux
const { useParams } = ReactRouterDOM

export function TodoEdit() {
  const dispatch = useDispatch()

  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const todos = useSelector((storeState) => storeState.todoModule.todos)
  const [selectedTodo, setSelectedTodo] = useState([])
  const { todoId } = useParams()

  useEffect(() => {
    if (user)
      setSelectedTodo(() =>
        todos.find((todo) => todo.owner._id === user._id && todo._id === todoId)
      )
  }, [])

  const sectionStyle = () => {
    if (!user) return { backgroundColor: '#ffffff', color: '#000000' }
    return {
      backgroundColor: user.backgroundColor || '#ffffff',
      color: user.textColor || '#000000',
    }
  }

  console.log(selectedTodo)
  if (!user || !selectedTodo)
    return (
      <section className="main-section" style={sectionStyle()}>
        <h1>Todo Edit</h1>
        <h2>No Selected Todo</h2>
      </section>
    )
  return (
    <section className="main-section" style={sectionStyle()}>
      <h1>Todo Edit</h1>
      <h2>{selectedTodo.todo}</h2>
    </section>
  )
}
