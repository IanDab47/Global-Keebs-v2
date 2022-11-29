import { timeSincePost } from '../../util/time'

export default function ListTab({ currTime, listing, i }) {
  return (
    <div
      className='tab'
      style={{ '--order': i / 13 + 1.1, '--length': '1.5s', '--flair': listing.flair_text }}
    >
      <div className='short'>
        <div
          className='flair'
          data-color={listing.flair_text}
        >
          {listing.flair_text.toLowerCase()}
        </div>

        {listing.location.toLowerCase() !== listing.flair_text.toLowerCase() &&
          <p className='location'>[{listing.location}]</p>}
        
        <p className='time' >{timeSincePost(currTime, listing.created_utc)}</p>
      </div>

      <div className='long'>
        <h1 value={listing.title}>{listing.title}</h1>

        <div>
          <p>u/{listing.author}</p>

          <span
            onClick={e => showTimestamp(listing)}
          >
            Timestamp
          </span>
        </div>

      </div>
    </div>
  )
}
