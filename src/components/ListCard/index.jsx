// React
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import Loading from '../Loading'

// Util
import { setTime, timeSincePost } from '../../util/time'
import { fetchImageFiles } from '../../util/requests'

// Styles
import './style.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import RadioButton from '../RadioButton'

export default function ListCard({ currTime, listing, i }) {
  const [timestamps, setTimestamps] = useState([])

  useEffect(async () => setTimestamps(await fetchImageFiles(listing.timestamps)), [])

  useEffect(() => console.log(timestamps), [timestamps])

  // Animate grid diagonally
  // (...) = order
  // % 30 = reset count based on page size
  // / 13 = rate
  // + 1.1 = delay -- Must be at least 1

  const rowCardNumber = !window ? null :
      window.innerWidth > 1313 ? 3 :
        window.innerWidth > 844 ? 2 : 1
    
  const gridAnimMath = (i % 30 % rowCardNumber + Math.floor(i % 30 / rowCardNumber)) / 13 + 1.1

  return (
    <div
      className='card'
      style={{ '--order': gridAnimMath, '--length': '1.5s' }}
    >
      <div className='top'>
        {!listing.timestamps.length ?
          (<div>
            <FontAwesomeIcon icon={faKeyboard} />
            <p>Global Keebs</p>
          </div>)
          : 
          <img src='' />
        }

        <div
          className='flair'
          data-color={listing.flair_text}
        >
          {listing.flair_text.toLowerCase()}
        </div>
      </div>

      <div className='bottom'>
        <Link to={`${listing.page_id}`}><h1>{listing.title}</h1></Link>

        <div>
          <p>u/{listing.author}</p>
          <p className='time'>{timeSincePost(currTime, listing.created_utc)}</p>
          <RadioButton />
        </div>
        
      </div>
    </div>
  )
}
