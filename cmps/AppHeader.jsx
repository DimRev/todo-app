import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {

  function onSetUser(user) {

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
      </section>
      <section className="main-login-section">
        <LoginSignup onSetUser={onSetUser}/>
      </section>
      <UserMsg />
    </header>
  )
}
