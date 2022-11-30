// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components

// Utils
import { setTime } from '../../util/time'

// Styles
import "./style.less"
import ListTab from '../../components/ListTab'
import ListCard from '../../components/ListCard'

export default function List() {
  // State
  const [list, setList] = useState([])
  const [listType, setListType] = useState(0)
  const [searchInput, setSearchInput] = useState(null)
  const [searchLabel, setSearchLabel] = useState('Search...')
  const [currTime, setCurrTime] = useState(setTime())
  
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
        <div className='searchbar'>
          <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
          <label>Search</label>
        </div>

        <div className='view-type'>
          <select
            name='view-type'
            onChange={e => setListType(Number(e.target.value))}
          >
            <option value={null}>Select View Type</option>
            <option value={0}>List</option>
            <option value={1}>Card</option>
          </select>
        </div>
      </form>
        
      <div className={`listings ${listType ? 'cards' : 'list'}`}>
        {listType ? cards : listings}
      </div>

    </section>
  )
}
