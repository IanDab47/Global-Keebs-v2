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
    // ::: REFACTOR :::
    const clearDropdown = (e) => {
      e.stopPropagation()
      setIsOpen(!isOpen)
      
      document.body.addEventListener('click', () => {
        setIsOpen(false)
      })
    }

    dropdownEl.current.parentNode.addEventListener('click', clearDropdown)

      // document.body.addEventListener('click', e => {
      //   setIsOpen(false)
      // })
    // })

    // // Hamburger
    // if (type === 'hamburger') {
    //   clickedEl !== dropdownEl.current.parentNode && isOpen && setIsOpen(!isOpen)
    // }

    // // Radio
    // if (type === 'radio') {
    //   clickedEl === dropdownEl.current.parentNode ||
    //   clickedEl?.classList.value === `pages ${title}` ||
    //   clickedEl?.classList.value.includes(`dropdown-page ${title}`) ?
    //     setIsOpen(!isOpen)
    //     :
    //     setIsOpen(false)
    // }

    return () => dropdownEl.current.parentNode.removeEventListener('click', clearDropdown)
  }, [])

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