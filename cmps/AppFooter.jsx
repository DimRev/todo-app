import { UserMsg } from './UserMsg.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppFooter() {
  return (
    <footer className="app-footer">
      <p>&copy; Made by DimRev</p>
    </footer>
  )
}
