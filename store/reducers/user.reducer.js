import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'

const initialState = {
  loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
  let loggedinUser
  switch (action.type) {
    case SET_USER:
      return { ...state, loggedinUser: action.user }
    case SET_USER_SCORE:
      const user = { ...state.loggedinUser, score: action.score }
      return { ...state, loggedinUser: user }
    case UPDATE_PREFERENCES:
      loggedinUser = { ...state.loggedinUser, ...action.userPreferences }
      return { ...state, loggedinUser }
    case ADD_ACTIVITY:
      loggedinUser = {
        ...state.loggedinUser,
        activities: action.activities,
      }
      return { ...state, loggedinUser }
    default:
      return state
  }
}
