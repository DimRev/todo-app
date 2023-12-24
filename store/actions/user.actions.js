import { userService } from '../../services/user.service.js'

import {
  SET_USER,
  ADD_ACTIVITY,
  UPDATE_PREFERENCES,
} from '../reducers/user.reducer.js'
import { store } from '../store.js'

export function logout() {
  return userService
    .logout()
    .then(() => {
      return setUser(null)
    })
    .catch((err) => {
      console.error('User.Actions Error => Cannot logout user', err)
      throw err
    })
}

export function setUser(user) {
  // const user = store.getState().userModule.loggedinUser

  store.dispatch({ type: SET_USER, user })
  navigate('/').catch((err) => {
    console.error('User.Actions Error => Cannot set user', err)
    throw err
  })
}

export function setPreferences(userPreferences) {
  return userService
    .updatePreferences(userPreferences)
    .then(() => {
      store.dispatch({ type: UPDATE_PREFERENCES, userPreferences })
    })
    .then(() => {
      return userService
        .addActivity('Updated Profile Preferences')
        .then((activities) => {
          store.dispatch({ type: ADD_ACTIVITY, activities })
        })
    })
    .catch((err) => {
      console.error('User.Actions Error => Cannot set user preference', err)
      throw err
    })
}
