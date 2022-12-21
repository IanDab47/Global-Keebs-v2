// React
import { useState, useRef } from 'react'
import DropdownMenu from '../Dropdown'
import Hamburger from '../Hamburger'

// Styles
import './style.less'

export default function RadioButton({ title, links }) {
  // Ref
  const radio = useRef()

  // State
  const [isOpen, setIsOpen] = useState(false)

  // Output
  const radioDots = () => {
    return (
      <>
        <svg>
          <circle cx={'50%'} cy={'50%'} r={'50%'} />
        </svg>
        <svg>
          <circle cx={'50%'} cy={'50%'} r={'50%'} />
        </svg>
        <svg>
          <circle cx={'50%'} cy={'50%'} r={'50%'} />
        </svg>
      </>
    )
  }

  return (
    <div className='radio-button' ref={radio}>
      {radioDots()}
      <DropdownMenu
        title={title}
        type={'radio'}
        links={links}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}
