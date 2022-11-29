// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components

// Utils
import { setTime } from '../../util/time'

// Styles
import "./style.less"
import ListTab from '../../components/ListTab'

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

  // Handlers
  

  // Output
  const listings = list.map((listing, i) => {
    i === 0 ? console.log(listing) : null 
    return (
      <ListTab
        key={`tab_GK${i}_${listing.pageId}`}
        listing={listing}
        currTime={currTime}
        i={i}
      />
    )}
  )

  return (
    <section className='list-page'>
      <form onSubmit={e => handleSearch}>

      </form>
        
      <div className='listings list'>
        {listings}
      </div>
    </section>
  )
}
