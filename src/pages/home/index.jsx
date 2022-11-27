

// Styles
import "./style.less"

export default function Home() {
  return (
    <header>
      <h1>Welcome to <span className="title-text accent">Global Keebs</span></h1>
      <div>
        <p>Click to Delete Financial Stability</p>
        <button onClick={e => console.log('hi')}>Continue</button>
      </div>
    </header>
  )
}
