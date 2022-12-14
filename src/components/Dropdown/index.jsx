// React
import { useState, useEffect, useRef } from 'react'

// Styles
import './style.less'

export default function Dropdown({ clickedEl, title, links }) {
  const [isOpen, setIsOpen] = useState(false)
  const parentEl = useRef(clickedEl)
  const dropdownEl = useRef(null)

  useEffect(() => {
    dropdownEl.current.parentNode.addEventListener('click', e => setIsOpen(true))
  }, [])

  console.log(links)

  return (
    <div ref={dropdownEl} className='drop-down'>
      <p>{title}</p>
      <ul>
      {links.map(({href, text}) => {
        return (
          <li key={text}>
            <a href={href} target="_blank">{text}</a>
          </li>
        )
      })}
      </ul>
    </div>
  )
}
