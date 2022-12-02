// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import ListTab from '../../components/ListTab'
import ListCard from '../../components/ListCard'
import FluidFilter from '../../components/FluidFilter'

// Utils
import { setTime } from '../../util/time'

// Styles
import "./style.less"

export default function List() {
  // State
  const [list, setList] = useState([])
  const [category, setCategory] = useState([])
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
  const handleSearch = async (e) => {
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
          <h1>{ category.length !== 1 || category.includes('') ? 'Listings' : category }</h1>

          <div className='searchbar'>
            <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <label>Search</label>
            <button className={ searchInput ? null : 'clear' }>Submit</button>
          </div>
        </header>

        <section className='filters'>

          <FluidFilter
            filterType={'category'}
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          />

          <FluidFilter
            filterType={'location'}
            filterInput={locationInput}
            setFilterInput={setLocationInput}
          />
          
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
