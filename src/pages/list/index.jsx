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
  const [category, setCategory] = useState([''])
  const [listType, setListType] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [filterInput, setFilterInput] = useState([''])
  const [locationInput, setLocationInput] = useState([''])
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
      setList([])
      setList(response.data)
      setCategory(filterInput)
    } catch (err) {
      console.warn(err)
    }
  }

  const toggleField = async (filter, value) => {
    
    // Set Temp array for filters
    let tempCategoryArr = filter === 'category' && filterInput.includes(value) ?
      filterInput.filter(category => category !== value) : null
    let tempLocationArr = filter === 'location' && locationInput.includes(value) ?
      locationInput.filter(location => location !== value) : null

    // Edit filter State based on toggle on or off
    if (filter === 'category') {
      filterInput.includes('') && setFilterInput(filterInput.shift())

      filterInput.includes(value) ?
        setFilterInput(tempCategoryArr)
        : 
        setFilterInput([...filterInput, value])
    }
    if (filter === 'location') {
      locationInput.includes('') && setLocationInput(locationInput.shift())

      locationInput.includes(value) ?
        setLocationInput(tempLocationArr)
        : 
        setLocationInput([...locationInput, value])
    }

    // Set to all if filter is empty
    if(tempCategoryArr && tempCategoryArr.length === 0) setFilterInput([''])
    if(tempLocationArr && tempLocationArr.length === 0) setLocationInput([''])
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
          <h1>{ category.length > 1 || category.includes('') ? 'Listings' : category }</h1>

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
                className={ filterInput.includes('') ? 'on' : '' } 
                onClick={e => setFilterInput([''])} 
              >
                All
              </p>
              <p 
                className={ filterInput.includes('SELLING') ? 'on' : '' } 
                onClick={e => toggleField('category', 'SELLING')} 
              >
                Selling
              </p>
              <p 
                className={ filterInput.includes('BUYING') ? 'on' : '' } 
                onClick={e => toggleField('category', 'BUYING')} 
              >
                Buying
              </p>
              <p 
                className={ filterInput.includes('ARTISAN') ? 'on' : '' } 
                onClick={e => toggleField('category', 'ARTISAN')} 
              >
                Artisan
              </p>
              <p 
                className={ filterInput.includes('GROUP BUY') ? 'on' : '' } 
                onClick={e => toggleField('category', 'GROUP BUY')} 
              >
                Group Buy
              </p>
              <p 
                className={ filterInput.includes('INTEREST CHECK') ? 'on' : '' } 
                onClick={e => toggleField('category', 'INTEREST CHECK')} 
              >
                Interest Check
              </p>
            </div>
          </div>

          <div className='location-filter'>
            <label>Locations</label>
            <div
              className='fluid'
              name='location-filter'
            >
              <p 
                className={ locationInput.includes('') ? 'on' : '' } 
                onClick={e => setLocationInput([''])} 
              >
                All
              </p>
              <p 
                className={ locationInput.includes('AS') ? 'on' : '' } 
                onClick={e => toggleField('location', 'AS')} 
              >
                Asia
              </p>              
              <p 
                className={ locationInput.includes('AU') ? 'on' : '' } 
                onClick={e => toggleField('location', 'AU')} 
              >
                Australia
              </p>              
              <p 
                className={ locationInput.includes('CA') ? 'on' : '' } 
                onClick={e => toggleField('location', 'CA')} 
              >
                Canada
              </p>              
              <p 
                className={ locationInput.includes('EU') ? 'on' : '' } 
                onClick={e => toggleField('location', 'EU')} 
              >
                Europe
              </p>
              <p 
                className={ locationInput.includes('US') ? 'on' : '' } 
                onClick={e => toggleField('location', 'US')} 
              >
                USA
              </p>
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
