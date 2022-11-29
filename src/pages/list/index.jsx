// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components

// Utils
import { setTime, timeSincePost } from '../../util/time'

// Styles
import "./style.less"

export default function List() {
  // State
  const [list, setList] = useState([])
  const [currTime, setCurrTime] = useState(setTime())
  
  // Hooks
  useEffect(() => {9
    const getList = async () => {
      try {

      } catch (err) {
        console.warn(err)
      }
      await axios.get("/api/v1/listings")
        .then(response => setList(response.data))
        .catch(console.warn)
    }
    getList()
  }, []); 

  const listings = list.map((listing, i) => {
    i === 0 ? console.log(listing) : null 
    return (
      <div
        className='tab'
        style={{ '--order': i / 13 + 1.1, '--length': '1.5s', '--flair': listing.flair_text }}
        key={listing.pageId}
      >
        <div className='short'>
          <div className='flair'>{listing.flair_text}</div>
          {listing.location.toLowerCase() !== listing.flair_text.toLowerCase() &&
            <p className='location'>[{listing.location}]</p>}
          <p className='time' >{timeSincePost(currTime, listing.created_utc)}</p>
        </div>
        <div className='long'>
          <h1 value={listing.title}>{listing.title}</h1>
          <p>u/{listing.author}</p>
        </div>
      </div>
    )}
  )

  return (
    <section className='list-page'>
      <div className='listings list'>
        {listings}
      </div>
    </section>
  )
}
