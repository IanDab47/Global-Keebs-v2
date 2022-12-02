import { timeSincePost } from '../../util/time'

// Styles
import './style.less'

export default function ListCard({ currTime, listing, i }) {
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
      style={{ '--order': gridAnimMath, '--length': '1.5s', '--flair': listing.flair_text }}
    >
      <div className='top'>
        {!listing.timestamp ?
          <p>...No Keeb For You!</p>
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
        <h1>{listing.title}</h1>

        <div>
          <p>u/{listing.author}</p>
          <p className='time'>{timeSincePost(currTime, listing.created_utc)}</p>
        </div>
        
      </div>
    </div>
  )
}
