import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

import { userService } from '../services/user.service.js'
import { SET_CART_IS_SHOWN, SET_USER } from '../store/store.js'

const { useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((storeState) => storeState.loggedinUser)
  const totalTodos = useSelector((storeState) => storeState.totalTodos)

  function progressBar() {
    const totalTodosCount = totalTodos.length
    const completedTodosCount = totalTodos.filter((todo) => todo.isDone).length
    const completionRate = Math.floor(
      (completedTodosCount / totalTodosCount) * 100
    )
    if (completionRate >= 0) return completionRate
  }

  function progressBarClass() {
    const completionRate = +progressBar()
    if (completionRate === 100) return 'done'
    if (completionRate >= 75) return 'high'
    if (completionRate >= 50) return 'mid'
    if (completionRate >= 25) return 'low'
    if (completionRate >= 0) return 'empty'
  }

  function onLogout() {
    userService
      .logout()
      .then(() => {
        // DONE: use dispatch
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    // DONE: use dispatch
    // setUser(user)
    dispatch({ type: SET_USER, user })
    navigate('/')
  }

  return (
    <header className="app-header">
      <section className="main-logo">
        <h1>Todos</h1>
      </section>
      <section className="main-nav-section">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todos</NavLink>
        <NavLink to="/about">About</NavLink>
        {user && <NavLink to="/profile">Profile</NavLink>}
      </section>
      <section className="main-login-section">
        {user ? (
          <section className="loggedin-section">
            <span className={`progress-bar ${progressBarClass()}`}>
              {progressBar()}%
            </span>
            <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section className="logged-out-section">
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
      </section>
      <UserMsg />
    </header>
  )
}
