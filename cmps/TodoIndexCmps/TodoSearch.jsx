const { useState, useEffect } = React

export function TodoSearch({onSearch}) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    onSearch(search.txt)
  },[search])

  function handleChange({ target }) {
    const { name: field, value } = target
    setSearch((prevSearch) => ({ ...prevSearch, [field]: value }))
  }

  return (
    <section className="todo-search-section">
      <input
        type="text"
        name="txt"
        onChange={handleChange}
        value={search.txt}
        placeholder="Search..."
      />
    </section>
  )
}
