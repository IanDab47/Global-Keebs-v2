// React
import { Link } from 'react-router-dom'

// Styles
import "./style.less"

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to={'/'}>Home</Link>
      <Link to={'/user/sign'}>Login</Link>
      <Link to={'/listings'}>List</Link>
      <Link to={'/listings/test'}>Listing</Link>
    </nav>
  )
}
