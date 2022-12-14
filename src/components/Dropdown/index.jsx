// React
import { useState, useEffect, useRef } from 'react'

// Styles
import './style.less'

export default function Dropdown({ clickedEl, title, links }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownEl = useRef(null)

  useEffect(() => {
    console.log(clickedEl, dropdownEl.current.parentNode)

    clickedEl === dropdownEl.current.parentNode ? setIsOpen(true) : setIsOpen(false)
  }, [clickedEl])

  return (
    <div ref={dropdownEl} className='drop-down'>
      {isOpen && (
        <>
          <p>{title}</p>
          <ul>
          {links.map(({href, text}) => {
            return (
              <li key={text}>
                <a href={href} target="_blank">{href}</a>
              </li>
            )
          })}
          </ul>
        </>
      )}
    </div>
  )
}
