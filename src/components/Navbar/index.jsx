// React
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Hamburger from '../Hamburger'

// Styles
import "./style.less"

export default function NavBar() {
  const [clickedEl, setClickedEl] = useState(null)

  const hamburgerLinks = [
    { href: '/listings', text: 'Browse' },
    { href: '/listings/test', text: 'Listing' },
    { href: '/user/sign', text: 'Login' },
  ]

  return (
    <nav className="navbar" onClick={e => setClickedEl(e.target)}>
      <Link to={'/'}><span>Global Keebs</span></Link>
      <Link to={'/user/sign'}>Login</Link>
      <Link to={'/listings'}>Browse</Link>
      <Link to={'/listings/test'}>Listing</Link>
      <Hamburger title={'Global Keebs'} links={hamburgerLinks} />
    </nav>
  )
}
