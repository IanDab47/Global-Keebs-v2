import { Link } from 'react-router-dom'

// Styles
import "./style.less"

export default function Home() {
  return (
    <header>
      <h1>Welcome to <span className="title-text accent">Global Keebs</span></h1>
      <div>
        <p>Click to Delete Financial Stability</p>
        <button><Link to={'/listings'}>Continue</Link></button>
      </div>
    </header>
  )
}
