// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import ListTab from '../../components/ListTab'
import ListCard from '../../components/ListCard'

// Utils
import { setTime } from '../../util/time'

// Styles
import "./style.less"

export default function List() {
  // State
  const [list, setList] = useState([])
  const [listType, setListType] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const currTime = setTime()
  
  // Hooks
  useEffect(() => {
    const getList = async () => {
      try {
        await axios.get("/api/v1/listings")
          .then(response => setList(response.data))
          .catch(console.warn)
      } catch (err) {
        console.warn(err)
      }
    }
    getList()
  }, []); 

  // Handlers
  

  // Output
  const listings = list.map((listing, i) => {
    // i === 0 ? console.log(listing) : null 
    return (
      <ListTab
        key={`tab_GK${i}_${listing.pageId}`}
        listing={listing}
        currTime={currTime}
        i={i}
      />
    )}
  )

  const cards = list.map((listing, i) => {
    // i === 0 ? console.log(listing) : null 
    return (
      <ListCard
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
        <header>
          <h1>Listings</h1>

          <div className='searchbar'>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <label>Search</label>
            <button className={ searchInput ? null : 'clear' }>Submit</button>
          </div>
        </header>

        <div className='view-type'>
          <select
            name='view-type'
            onChange={e => setListType(Number(e.target.value))}
          >
            { typeof listType === 'number' ? null : <option>Select View Type</option> }
            <option value={0}>List</option>
            <option value={1}>Card</option>
          </select>
        </div>
      </form>
        
      <div className={`listings ${ listType ? 'cards' : 'list' }`}>
        { listType ? cards : listings }
      </div>

    </section>
  )
}
