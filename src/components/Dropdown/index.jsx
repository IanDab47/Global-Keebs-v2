// React
import { useRef } from 'react'

// Styles
import './style.less'

export default function Dropdown({ clickedEl, links }) {
  const parentEl = useRef(clickedEl)
  const dropdownEl = useRef(null)

  return (
    <div ref={dropdownEl} className='drop-down'>
      {links.map(({href, text}) => {
        return (
          <ul key={text}>
            <li><a href={href}>{text}</a></li>
          </ul>
        )
      })}
    </div>
  )
}
