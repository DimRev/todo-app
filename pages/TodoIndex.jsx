const { useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoSearch } from '../cmps/TodoIndexCmps/TodoSearch.jsx'
import { TodoFilter } from '../cmps/TodoIndexCmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoIndexCmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoIndexCmps/TodoInput.jsx'

import { utilService } from '../services/util.service.js'

import { loadTodos, toggleTodo, addTodo, clearComplete, setFilter, setSearchWord } from '../store/actions/todo.actions.js'

export function TodoIndex() {

  const debounceSearch = useRef(utilService.debounce(onSearch, 500))

  const todos = useSelector((storeState) => storeState.todoModule.todos)
  const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)
  const searchWord = useSelector(
    (storeState) => storeState.todoModule.searchWord
  )
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  useEffect(() => {
    loadTodos()
  }, [filterBy, searchWord])

  function onToggleTodo(todo) {
    toggleTodo(todo)
  }

  function onAddTodo(newTodo) {
    addTodo(newTodo)
  }

  function onFilterBy(filter) {
    setFilter(filter)
  }

  function onSearch(searchWord) {
    setSearchWord(searchWord)
  }

  function onClearComplete() {
    clearComplete()
  }

  const sectionStyle = () => {
    if (!user) return { backgroundColor: '#ffffff', color: '#000000' }
    return {
      backgroundColor: user.backgroundColor || '#ffffff',
      color: user.textColor || '#000000',
    }
  }

  return (
    <section className="main-section todo-index-page" style={sectionStyle()}>
      <TodoSearch onSearch={debounceSearch.current} />
      <TodoInput onAddTodo={onAddTodo} />
      <TodoList todos={todos} onToggleTodo={onToggleTodo} />
      <TodoFilter onFilterBy={onFilterBy} onClearComplete={onClearComplete} />
    </section>
  )
}
