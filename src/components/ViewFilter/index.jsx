// React
import React from 'react'

// Styles
import './style.less'

const views = [
  { value: 1, name: 'Card' },
  { value: 0, name: 'List' }
]

export default function ViewFilter({ listType, setListType }) {
  return (
    <>
      <label>Select View Type: </label>
      <div>
        {views.map(view => (
          <button
            key={view.name + '_' + view.value}
            className={listType === view.value ? 'on' : ''}
            onClick={e => listType !== view.value ?
              setListType(view.value)
              :
              e.preventDefault()}
          >
            {view.name}
          </button>
        ))}
      </div>
    </>
  )
}
