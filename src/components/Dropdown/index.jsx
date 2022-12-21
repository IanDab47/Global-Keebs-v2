// React
import { useState, useEffect, useRef } from 'react'
import { useClick } from '../../context/ClickContext'
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
  
  useEffect(() => {
    const parentEl = dropdownEl.current.parentNode

    console.log(currentTarget !== parentEl, isOpen)

    currentTarget !== parentEl && isOpen && setIsOpen(false)
  }, [currentTarget])

  return (
    <div ref={dropdownEl} className={`drop-down`}>
      {isOpen && (
        <>
          <DropdownList links={links} page={page}>{children}</DropdownList>
          {links.length > 10 &&
            <DropdownPages
              page={page}
              pages={Math.ceil(links.length / 10)}
              setPage={setPage}
              pagesEl={pagesEl}
            >{children}</DropdownPages>
          }
        </>
      )}
    </div>
  )
}

const DropdownPages = ({ page, pages, setPage, children, pagesEl }) => {
  const pageList = [...Array(pages).keys()]

  return (
    <div className={`pages ${children}`}>
      {pageList.map((pageNumber) =>
        <p
          key={`page_${pageNumber}`}
          className={`dropdown-page ${children} ${page === pageNumber ? 'active' : ''}`}
          onClick={() => setPage(pageNumber)}
          value={pageNumber}
          ref={pagesEl}
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
      <p>{children}</p>
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