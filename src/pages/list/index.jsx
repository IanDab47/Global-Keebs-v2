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

  const handleFilters = e => {
    e.preventDefault()
    e.target.name === 'fluid-filter' ?
      setFilterInput(e.target.value)
      :
      setLocationInput(e.target.value)
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
            <label>Categories</label>
            <div
              className='fluid'
              name='flair-filter'
            >
              <p 
                className={ filterInput === '' ? 'checked' : '' } 
                value={''}
                onClick={e => setFilterInput(e.target.value)}
                disabled 
              >
                All
              </p>
              <p 
                className={ filterInput === 'Selling' ? 'checked' : '' } 
                value={'Selling'}
                onClick={e => setFilterInput(e.target.value)}
                disabled 
              >
                Selling
              </p>
              <p 
                className={ filterInput === 'Buying' ? 'checked' : '' } 
                value={'Buying'}
                disabled 
              >
                Buying
              </p>
              <p 
                className={ filterInput === 'Artisan' ? 'checked' : '' } 
                value={'Artisan'}
                disabled 
              >
                Artisan
              </p>
              <p 
                className={ filterInput === 'Upcoming' ? 'checked' : '' } 
                value={'Upcoming'}
                disabled 
              >
                GBs and ICs
              </p>
            </div>
          </div>

          <div className='location-filter'>
            <label>Locations</label>
            <div
              className='fluid'
              name='location-filter'
              onClick={e => setLocationInput(e.target.value)}
              multiple
            >
              <p disabled className='checked' value={''}>All</p>
              <p disabled value={'AS'}>Asia</p>
              <p disabled value={'AU'}>Australia</p>
              <p disabled value={'CA'}>Canada</p>
              <p disabled value={'EU'}>Europe</p>
              <p disabled value={'US'}>USA</p>
            </div>
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
