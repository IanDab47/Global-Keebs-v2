// React
import { useState, useRef } from 'react'
import Dropdown from '../Dropdown'

// Styles
import './style.less'

export default function RadioButton({ clickedEl, links }) {
  // Ref
  const radio = useRef(null)

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
      <Dropdown clickedEl={radio} links={links} />
    </div>
  )
}
