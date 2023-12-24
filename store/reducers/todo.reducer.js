export const SET_TODOS = 'SET_TODOS'
export const TOGGLE_TODO_ISDONE = 'TOGGLE_TODO_ISDONE'
export const ADD_TODO = 'ADD_TODO'
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS'

export const SET_FILTERBY = 'SET_FILTERBY'
export const SET_SEARCHWORD = 'SET_SEARCHWORD'

const initialState = {
  todos: [],
  totalTodos: [],
  isLoading: false,
  filterBy: 'all',
  searchWord: '',
}

export function todoReducer(state = initialState, action = {}) {
  let todos
  let totalTodos
  console.log(state, action)
  switch (action.type) {
    //---------------------TODOS-----------------------------//
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos.filteredTodos,
        totalTodos: action.todos.totalTodos,
      }
    case TOGGLE_TODO_ISDONE:
      todos = state.todos.map((todo) =>
        todo._id === action.updatedTodo._id ? action.updatedTodo : todo
      )
      totalTodos = state.totalTodos.map((todo) =>
        todo._id === action.updatedTodo._id ? action.updatedTodo : todo
      )
      return { ...state, todos, totalTodos }
    case ADD_TODO:
      todos = [action.addedTodo, ...state.todos]
      totalTodos = [action.addedTodo, ...state.totalTodos]
      return { ...state, todos, totalTodos }
    case CLEAR_COMPLETED_TODOS:
      todos = state.todos.filter(
        (todo) => !action.completedTodoIds.includes(todo._id)
      )
      totalTodos = state.totalTodos.filter(
        (todo) => !action.completedTodoIds.includes(todo._id)
      )
      return { ...state, todos, totalTodos }
    //---------------------FILTER/SEARCH---------------------//
    case SET_FILTERBY:
      return { ...state, filterBy: action.filter }
    case SET_SEARCHWORD:
      return { ...state, searchWord: action.searchWord }
    default:
      return state
  }
}
