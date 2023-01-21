// React
import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

// Components
import Loading from '../../components/Loading'
import ListTab from '../../components/ListTab'
import ListCard from '../../components/ListCard'
import FluidFilter from '../../components/FluidFilter'
import ViewFilter from '../../components/ViewFilter'

// Utils
import { setTime } from '../../util/time'

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "./style.less"

export default function List() {
  // States
  const currTime = setTime()
  const [searchParams, setSearchParams] = useSearchParams()
  const [list, setList] = useState([])
  const listMemoized = useMemo(() => list, [list])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([''])
  const [listType, setListType] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [filterInput, setFilterInput] = useState([''])
  const [locationInput, setLocationInput] = useState([''])
  const [applyFilters, setApplyFilters] = useState(false)
  let listAPIURL = null
  
  // Hooks
  useEffect(() => {
    const getQuery = () => {
        // Check query for search inputs
        const searchQuery = searchParams.get('search') ? searchParams.get('search') : ''
        const categoryQuery = searchParams.get('category') ?
          searchParams.get('category').split(',') : ['']
        const locationQuery = searchParams.get('location') ?
          searchParams.get('location').split(',') : ['']
        
        // Select view type based on query
        searchParams.get('view-type') ? setListType(0) : null

        // Set queries to respective states
        setSearchInput(searchQuery)
        setFilterInput(categoryQuery)
        setLocationInput(locationQuery)

        // Assign any queries to API URL
        listAPIURL = `/api/v1/listings?search=${searchQuery}&filter=${categoryQuery}&location=${locationQuery}`
    }
    getQuery()

    const getList = async () => {
      try {
        // Request content from API
        const response = await axios.get(listAPIURL)
        console.log(response.data)
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
    page === 0 && setLoading(true)

    // Remove space following search term
    searchInput[searchInput.length - 1] === ' ' &&
      setSearchInput(prevState => prevState.substring(0, prevState.length - 1))

    // set search queries as params
    const url = new URL(`http://localhost:3030/listings?${searchInput !== '' ? 'search=' + searchInput : ''}${!filterInput.includes('') ? '&category=' + filterInput : ''}${!locationInput.includes('') ? '&location=' + locationInput : ''}${listType === 1 ? '' : '&view-type=list'}`)
    const params = new URLSearchParams(url.search)
    setSearchParams(params)
    
    listAPIURL = `/api/v1/listings?search=${searchInput}&filter=${filterInput}&location=${locationInput}&page=${page}`
    
    try {
      const response = await axios.get(listAPIURL)
      // page === 0 && setList([])
      page !== 0 ? setList([...list, ...response.data]) : setList(response.data)
      setCategory(filterInput)
      setPage(page)
      setLoading(false)
    } catch (err) {
      console.warn(err)
    }
  }

  // Output
  const listings = listMemoized.map((listing, i) => {
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

  const cards = listMemoized.map((listing, i) => {
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
      <Loading clear={loading ? false : true} /> 

      {listMemoized && (
        <section className='list-page'>
          <form onSubmit={e => fetchListings(e)}>
            <header>
              <h1>{category.length !== 1 || category.includes('') ? 'Listings' : category}</h1>

              <div className='searchbar'>
                <input type='text' name='search' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
                <label>Search</label>
                <button className={searchInput ? null : 'clear'}>{ innerWidth <= 768 ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : 'Submit' }</button>
              </div>
            </header>

            <section className='filters'>

              <FluidFilter
                filterType={'category'}
                filterInput={filterInput}
                setFilterInput={setFilterInput}
                setApplyFilters={setApplyFilters}
              />

              <FluidFilter
                filterType={'location'}
                filterInput={locationInput}
                setFilterInput={setLocationInput}
                setApplyFilters={setApplyFilters}
              />
            
              <div className='view-type'>
                {window.innerWidth > 640 && 
                  <ViewFilter
                    listType={listType}
                    setListType={setListType}
                  />
                }
                <button className={applyFilters ? null : 'clear'} onClick={() => setApplyFilters(false)}>Apply</button>
              </div>

            </section>
          </form>
          
          {!loading && (
            <>
              <div className={`listings ${listType ? 'cards' : 'list'}`}>
                {listType ? cards : listings}
              </div>
            
              {/* TODO: Add auto fetch to load more component. 
                  TODO: Toggle hidden if no results */}
              
              {list.length ?
                <button onClick={e => fetchListings(e, page + 1)}>Load More . . .</button>
                :
                !loading && <p className={'search-error'}><span>ERROR</span>: No More Keebs D:</p>
              }
            </>
          )}

        </section>
      )}
    </>
  )
}
