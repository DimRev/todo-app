import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  updateScore,
  updatePreferences,
  addActivity,
  getEmptyCredentials,
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid login')
  })
}

function signup({ username, password, fullname }) {
  const user = {
    username,
    password,
    fullname,
    score: 10000,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    activities: [],
  }
  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function addActivity(activity) {
  const ts = Date.now()
  const loggedInUserId = getLoggedinUser()._id
  return userService
    .getById(loggedInUserId)
    .then((user) => {
      if (!user.activities) user.activities = [{ activity, ts }]
      else user.activities = [{ activity, ts }, ...user.activities]
      return storageService.put(STORAGE_KEY, user)
    })
    .then((user) => {
      _setLoggedinUser(user)
      return user.activities
    })
}

function updatePreferences(userPreferences) {
  const loggedInUserId = getLoggedinUser()._id
  return userService
    .getById(loggedInUserId)
    .then((user) => {
      user = { ...user, ...userPreferences }
      return storageService.put(STORAGE_KEY, user)
    })
    .then((user) => {
      _setLoggedinUser(user)
      return user.activities
    })
}

function updateScore(diff) {
  const loggedInUserId = getLoggedinUser()._id
  return userService
    .getById(loggedInUserId)
    .then((user) => {
      if (user.score + diff < 0) return Promise.reject('No credit')
      user.score += diff
      return storageService.put(STORAGE_KEY, user)
    })
    .then((user) => {
      _setLoggedinUser(user)
      return user.score
    })
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
    backgroundColor: user.backgroundColor,
    textColor: user.textColor,
    activities: user.activities || [],
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})
