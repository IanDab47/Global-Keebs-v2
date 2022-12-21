// React
import { useState } from 'react'
import DropdownMenu from '../Dropdown'

// Styles
import './style.less'

export default function RadioButton({ children, links }) {
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
    <div className='radio-button' onClick={() => setIsOpen(!isOpen)}>
      {radioDots()}
      <DropdownMenu
        links={links}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >{children}</DropdownMenu>
    </div>
  )
}
