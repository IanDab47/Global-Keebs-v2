// React
import { useState, useEffect, useRef } from 'react'
import { useClick, useClickPosition } from '../../context/ClickContext'
import { Link } from 'react-router-dom'

// Styles
import './style.less'

export default function DropdownMenu({ children, links, isOpen, setIsOpen }) {
  // Refs
  const dropdownEl = useRef(null)
  const pagesEl = useRef(null)

  // States
  const [page, setPage] = useState(0)
  const currentTarget = useClick()
  const { xPos, yPos } = useClickPosition()

  // Handlers
  const selectPage = (e, pageNumber) => {
    e.stopPropagation()
    setPage(pageNumber)
  }
  
  // Hooks
  useEffect(() => {
    const parentEl = dropdownEl.current.parentNode

    // Check clicked element to close dropdown
    currentTarget !== parentEl && !currentTarget?.classList.value.includes('pages') && !currentTarget?.classList.value.includes('page') && isOpen && setIsOpen(false)
  }, [currentTarget])

  useEffect(() => {
    // Stop scroll on radio click
    document.body.style.overflowY = isOpen ? 'clip' : 'auto'
    return () => document.body.style.overflowY = 'auto'
  }, [isOpen])

  return (
    <div className="fixed-wrapper">
      <div style={{ '--xPos': xPos, '--yPos': yPos }} ref={dropdownEl} className={`drop-down`}>
        {isOpen && (
          <>
            <DropdownList links={links} page={page}>{children}</DropdownList>
            {links.length > 10 &&
              <DropdownPages
                page={page}
                pages={Math.ceil(links.length / 10)}
                handleClick={selectPage}
                pagesEl={pagesEl}
              >{children}</DropdownPages>
            }
          </>
        )}
      </div>
    </div>
  )
}

const DropdownPages = ({ page, pages, handleClick, children, pagesEl }) => {
  const pageList = [...Array(pages).keys()]

  return (
    <div className={`pages ${children}`} ref={pagesEl}>
      {pageList.map((pageNumber) =>
        <p
          key={`page_${pageNumber}`}
          className={`dropdown-page ${children} ${page === pageNumber ? 'active' : ''}`}
          onClick={e => handleClick(e, pageNumber)}
          value={pageNumber}
        >
          {pageNumber + 1}
        </p>
      )}
    </div>
  )
}

const DropdownList = ({ children, links, page }) => {
  return (
    <>
      {children && <p>{children}</p>}
      <ul>
        {links.map(({ href, text }, i) =>
          <DropdownListItem key={`${text}_${i}`} href={href} text={text} page={page} i={i} />
        )}
      </ul>
    </>
  )
}

const DropdownListItem = ({ href, text, page, i }) => {
  const listItem =
    <li key={`${text}_${i}`} className={Math.floor(i / 10) === page ? 'show' : 'hide'}>{text}</li>

  return href[0] === '/' ? 
    <Link to={href}>{listItem}</Link>
    :
    <a href={href} target="_blank">{listItem}</a>

}

const animateHide = () => {
  setTimeout(() => { }, 1000)
  return 'hide'
}