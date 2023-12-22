import { userService } from '../services/user.service.js'

const { createStore } = Redux

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

// a. List of todos
// b. isLoading
// c. Current filterBy
// d. User object

const initialState = {
  todos: [],
  isLoading: false,
  filterBy: 'all',
  loggedinUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
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
