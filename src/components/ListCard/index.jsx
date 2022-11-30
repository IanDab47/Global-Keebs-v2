// Styles
import './style.less'

export default function ListCard({ currTime, listing, i }) {
  // Animate grid diagonally
  // (...) = order
  // / 13 = rate
  // + 1.1 = delay -- Must be at least 1

  const rowCardNumber = !window ? null :
    window.innerWidth > 1660 ? 4 :
      window.innerWidth > 1252 ? 3 :
        window.innerWidth > 844 ? 2 : 1
    
  const gridAnimMath = (i % rowCardNumber + Math.floor(i / rowCardNumber)) / 13 + 1.1

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

        <p>u/{listing.author}</p>
      </div>
    </div>
  )
}
