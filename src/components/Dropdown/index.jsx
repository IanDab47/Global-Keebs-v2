// React
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Styles
import './style.less'

export default function DropdownMenu({ type, title, links, isOpen, setIsOpen }) {
  // Refs
  const dropdownEl = useRef(null)
  const pagesEl = useRef(null)

  // States
  const [page, setPage] = useState(0)

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
              pagesEl={pagesEl}
            />
          }
        </>
      )}
    </div>
  )
}

const DropdownPages = ({ page, pages, setPage, title, pagesEl }) => {
  const pageList = [...Array(pages).keys()]

  return (
    <div className={`pages ${title}`}>
      {pageList.map((pageNumber) =>
        <p
          key={`page_${pageNumber}`}
          className={`dropdown-page ${title} ${page === pageNumber ? 'active' : ''}`}
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

const DropdownList = ({ title, links, page }) => {
  return (
    <>
      <p>{title}</p>
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