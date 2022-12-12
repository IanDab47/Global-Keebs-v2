// React
import { Link } from 'react-router-dom'

// Util
import { timeSincePost } from '../../util/time'

// Styles
import './style.less'

export default function ListTab({ currTime, listing, i }) {
  return (
    <div
      className='tab'
      style={{
        '--order': i % 30 / 13 + 1.1,
        '--length': '1.5s',
        '--flair': listing.flair_text
      }}
    >
      <div className='short'>
        <div
          className='flair'
          data-color={listing.flair_text}
        >
          {listing.flair_text.toLowerCase()}
        </div>

        {
          listing.location.toLowerCase() !== listing.flair_text.toLowerCase() ||
          listing.location === '' 
            ? <p className='location'>[{listing.location}]</p>
            : null
        }
        
        <p className='time' >{timeSincePost(currTime, listing.created_utc)}</p>
      
      </div>

      <div className='long'>
        <Link to={`${listing.page_id}`}><h1 value={listing.title}>{listing.title}</h1></Link>

        <div>
          <p>u/{listing.author}</p>
          
          {listing.timestamps && (
            <span onClick={e => showTimestamps(listing)}>{listing.timestamps.length === 1 ? 'Timestamp' : 'Timestamps'}</span>
          )}

        </div>

      </div>
    </div>
  )
}
