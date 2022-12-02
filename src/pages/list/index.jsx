// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import Loading from '../../components/Loading'
import ListTab from '../../components/ListTab'
import ListCard from '../../components/ListCard'
import FluidFilter from '../../components/FluidFilter'

// Utils
import { setTime } from '../../util/time'

// Styles
import "./style.less"

export default function List() {
  // States
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
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
  const fetchListings = async (e, page = 0) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.get(listAPIURL + `&page=${page}`)
      console.log(response.data)
      // response && setLoading(false)
      page === 0 && setList([])
      page !== 0 ? setList([...list, ...response.data]) : setList(response.data)
      setCategory(filterInput)
      setPage(page)
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
        page={page}
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
        page={page}
        currTime={currTime}
        i={i}
      />
    )}
  )
  
  return (
    <>
      <Loading clear={list ? true : false} /> 

      {list && (
        <section className='list-page'>
          <form onSubmit={e => fetchListings(e)}>
            <header>
              <h1>{category.length !== 1 || category.includes('') ? 'Listings' : category}</h1>

              <div className='searchbar'>
                <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                <label>Search</label>
                <button className={searchInput ? null : 'clear'}>Submit</button>
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
          
          <div className={`listings ${listType ? 'cards' : 'list'}`}>
            {listType ? cards : listings}
          </div>
          
          {/* TODO: Add auto fetch to load more component. 
              TODO: Toggle hidden if no results */}
          {list.length ?
            <button onClick={e => fetchListings(e, page + 1)}>Load More . . .</button>
            :
            <p className={`${!loading ? '' : 'search-error'}`}><span>ERROR</span>: No More Keebs D:</p>}

        </section>
      )}
    </>
  )
}
