import { Link } from 'react-router-dom'

// Styles
import "./style.less"

export default function Home() {
  return (
    <header style={{ '--length': '4s' }}>
      <h1 style={{ '--order': 1 }}>
        Welcome to <span className="title-text accent">Global Keebs</span>
      </h1>
      <div style={{ '--order': 2 }}>
        <p>Click to Delete Financial Stability</p>
        <button><Link to={'/listings'}>Continue</Link></button>
      </div>
    </header>
  )
}
