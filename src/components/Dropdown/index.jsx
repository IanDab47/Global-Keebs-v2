// React
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Styles
import './style.less'

export default function DropdownMenu({ clickedEl, type, title, links, isOpen, setIsOpen }) {
  // Refs
  const dropdownEl = useRef(null)
  const dropdownPageEl = useRef(null)

  // States
  const [page, setPage] = useState(0)

  useEffect(() => {
    // Hamburger
    if (type === 'hamburger') {
      
    }

    // Radio
    if (type === 'radio') {
      clickedEl === dropdownEl.current.parentNode ||
      clickedEl?.classList.value === `pages ${title}` ||
      clickedEl?.classList.value.includes(`dropdown-page ${title}`) ?
        setIsOpen(!isOpen)
        :
        setIsOpen(false)
    }
  }, [clickedEl])

  return (
    <div ref={dropdownEl} className={`drop-down`}>
      {isOpen && (
        <>
          <DropdownList title={title} links={links} page={page} />
          {links.length > 10 &&
            <DropdownPages
            page={page}
            pages={Math.ceil(links.length / 10)}
            title={title}
            setPage={setPage}
            currentEl={dropdownPageEl}
          />
          }
        </>
      )}
    </div>
  )
}

const DropdownPages = ({ page, pages, setPage, title, currentEl }) => {
  const pageList = [...Array(pages).keys()]

  return (
    <div className={`pages ${title}`} >
      {pageList.map((pageNumber) =>
        <p
          key={`page_${pageNumber}`}
          className={`dropdown-page ${title} ${page === pageNumber ? 'active' : ''}`}
          ref={currentEl}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber + 1}
        </p>
      )}
    </div>
  )
}

const DropdownList = ({ title, links, page }) => {
  return (
    <>
      <p>{title}</p>
      <ul>
        {links.map(({ href, text }, i) =>
          <DropdownListItem key={text} href={href} text={text} page={page} i={i} />
        )}
      </ul>
    </>
  )
}

const DropdownListItem = ({ href, text, page, i }) => {
  const listItem =
    <li key={text} className={Math.floor(i / 10) === page ? 'show' : 'hide'}>{text}</li>

  return href[0] === '/' ? 
    <Link to={href}>{listItem}</Link>
    :
    <a href={href} target="_blank">{listItem}</a>

}

const animateHide = () => {
  setTimeout(() => { }, 1000)
  return 'hide'
}