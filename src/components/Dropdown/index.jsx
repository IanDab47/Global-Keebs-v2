// React
import { useState, useEffect, useRef } from 'react'

// Styles
import './style.less'

export default function DropdownMenu({ clickedEl, title, links }) {
  // Refs
  const dropdownEl = useRef(null)
  const dropdownPageEl = useRef(null)

  // States
  const [page, setPage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    clickedEl === dropdownEl.current.parentNode ||
    clickedEl?.classList.value.includes('dropdown-page') ?
      setIsOpen(true)
      :
      setIsOpen(false)
  }, [clickedEl])

  return (
    <div ref={dropdownEl} className='drop-down'>
      {isOpen && (
        <>
          <DropdownList title={title} links={links} page={page} />
          {links.length > 10 &&
            <DropdownPages
            page={page}
            pages={Math.floor(links.length / 10)}
            setPage={setPage}
            currentEl={dropdownPageEl}
          />
          }
        </>
      )}
    </div>
  )
}

const DropdownPages = ({ page, pages, setPage, currentEl }) => {
  const pageList = [...Array(pages).keys()]

  return (
    <div className='pages' >
      {pageList.map((pageNumber) =>
        <p
          className={`dropdown-page ${page === pageNumber ? 'active' : ''}`}
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
  return (
    <li key={text} className={Math.floor(i / 10) === page ? 'show' : 'hide' }>
      <a
        href={href} target="_blank">{text}</a>
    </li>
  )
}

const animateHide = () => {
  setTimeout(() => { }, 1000)
  return 'hide'
}