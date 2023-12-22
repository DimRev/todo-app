import { userService } from '../services/user.service.js'

const { createStore } = Redux

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

export const SET_TODOS = 'SET_TODOS'
export const TOGGLE_TODO_ISDONE = 'TOGGLE_TODO_ISDONE'
export const ADD_TODO = 'ADD_TODO'
export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS'

export const SET_FILTERBY = 'SET_FILTERBY'
export const SET_SEARCHWORD = 'SET_SEARCHWORD'

// a. List of todos
// b. isLoading
// c. Current filterBy
// d. User object

const initialState = {
  todos: [],
  isLoading: false,
  filterBy: 'all',
  searchWord: '',
  loggedinUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
  let todos
  switch (action.type) {
    //TO DOS
    case SET_TODOS:
      return { ...state, todos: action.todos }

    case TOGGLE_TODO_ISDONE:
      todos = state.todos.map((todo) =>
        todo._id === action.updatedTodo._id ? action.updatedTodo : todo
      )
      return { ...state, todos }

    case ADD_TODO:
      todos = [action.addedTodo, ...state.todos]
      return { ...state, todos }

    case CLEAR_COMPLETED_TODOS:
      todos = state.todos.filter(
        (todo) => !action.completedTodoIds.includes(todo._id)
      )
      return { ...state, todos }

    case SET_FILTERBY:
      return { ...state, filterBy: action.filter }
    case SET_SEARCHWORD:
      return { ...state, searchWord: action.searchWord }

    case SET_USER:
      return { ...state, loggedinUser: action.user }
    case SET_USER_SCORE:
      const user = { ...state.loggedinUser, score: action.score }
      return { ...state, loggedinUser: user }
    default:
      return state
  }
}

export const store = createStore(appReducer)

window.gStore = store
