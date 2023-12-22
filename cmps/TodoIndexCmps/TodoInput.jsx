const { useState } = React

export function TodoInput({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('')

  function handleChange({ target }) {
    const { name: field, value } = target
    setNewTodo((prevTodo) => ({ ...prevTodo, [field]: value }))
  }
  function onAddClick() {
    onAddTodo(newTodo)
    setNewTodo((prevTodo) => ({ ...prevTodo, todo: '' }))
  }

  return (
    <section className="todo-input-section">
      <input
        type="text"
        name="todo"
        onChange={handleChange}
        value={newTodo.todo}
        placeholder="Add a new Todo"
      />
      <button onClick={onAddClick}>Add Todo</button>
    </section>
  )
}
