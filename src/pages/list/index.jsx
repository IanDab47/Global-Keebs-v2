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
  const [listType, setListType] = useState(1)
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
  const handleSearch = async e => {
    e.preventDefault()

    try {
      const response = await axios.get(`/api/v1/listings?search=${searchInput}`)
      setList(response.data)
    } catch (err) {
      console.warn(err)
    }
  }

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
      <form onSubmit={e => handleSearch(e)}>
        <header>
          <h1>Listings</h1>

          <div className='searchbar'>
            <input type='text' value={searchInput} onClick={e => setSearchInput(e.target.value)} />
            <label>Search</label>
            <button className={ searchInput ? null : 'clear' }>Submit</button>
          </div>
        </header>

        <div className='view-type'>
          {window.innerWidth > 640 && (
            <select
              name='view-type'
              onChange={e => setListType(Number(e.target.value))}
            >
              { typeof listType === 'number' ? null : <option>Select View Type</option> }
              <option value={1}>Card</option>
              <option value={0}>List</option>
            </select>
          )}
        </div>
      </form>
        
      <div className={`listings ${ listType ? 'cards' : 'list' }`}>
        { listType ? cards : listings }
      </div>

    </section>
  )
}
