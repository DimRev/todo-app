import { TodoFilter } from '../cmps/TodoFilter.jsx';
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoInput } from '../cmps/TodoInput.jsx'
export function TodoIndex() {
  return (
    <section className="todo-index-page">
      <TodoInput />
      <TodoList />
      <TodoFilter/>
    </section>
  )
}
