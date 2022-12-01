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
  const [category, setCategory] = useState('')
  const [listType, setListType] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const currTime = setTime()
  const listAPIURL = `/api/v1/listings?search=${searchInput}&filter=${filterInput}&location=${locationInput}`
  
  // Hooks
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get(listAPIURL)
        setList(response.data)
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
      const response = await axios.get(listAPIURL)
      console.log(response.data)
      setList(response.data)
      setCategory(filterInput)
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
          <h1>{ category === '' ? 'Listings' : category }</h1>

          <div className='searchbar'>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <label>Search</label>
            <button className={ searchInput ? null : 'clear' }>Submit</button>
          </div>
        </header>

        <section className='filters'>

          <div className='flair-filter'>
            <label>Categories </label>
            <select
              className='fluid'
              name='flair-filter'
              onClick={e => setFilterInput(e.target.value)}
              multiple
            >
              <option value={''}>All</option>
              <option value={'Selling'}>Selling</option>
              <option value={'Buying'}>Buying</option>
              <option value={'Artisan'}>Artisan</option>
              <option value={'Upcoming'}>GBs and ICs</option>
            </select>
          </div>

          <div className='location-filter'>
            <label>Locations </label>
            <select
              className='fluid'
              name='location-filter'
              onClick={e => setLocationInput(e.target.value)}
              multiple
            >
              <option value={''}>All</option>
              <option value={'AS'}>Asia</option>
              <option value={'AU'}>Australia</option>
              <option value={'CA'}>Canada</option>
              <option value={'EU'}>Europe</option>
              <option value={'US'}>USA</option>
            </select>
          </div>
          
          <div className='view-type'>
            {window.innerWidth > 640 && (
              <>
                <label>Select View Type: </label>
                <select
                  name='view-type'
                  onClick={e => setListType(Number(e.target.value))}
                >
                  <option value={1}>Card</option>
                  <option value={0}>List</option>
                </select>
              </>
            )}
          </div>

        </section>
      </form>
        
      <div className={`listings ${ listType ? 'cards' : 'list' }`}>
        { listType ? cards : listings }
      </div>

    </section>
  )
}
