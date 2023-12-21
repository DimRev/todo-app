import { UserMsg } from './UserMsg.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
  return (
    <header className="main-header">
      <section className="main-logo"></section>
      <section className="main-nav-section">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todos</NavLink>
        <NavLink to="/about">About</NavLink>
      </section>
      <section className="main-login-section"></section>
      <UserMsg />
    </header>
  )
}
