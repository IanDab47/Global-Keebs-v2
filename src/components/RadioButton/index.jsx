// React
import { useState, useRef } from 'react'
import DropdownMenu from '../Dropdown'

// Styles
import './style.less'

export default function RadioButton({ clickedEl, title, links }) {
  // Ref
  const radio = useRef()

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
      <DropdownMenu clickedEl={clickedEl} title={title} links={links} />
    </div>
  )
}
