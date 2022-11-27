// React
import { useState, useEffect } from 'react'
import axios from 'axios'

// Styles
import "./style.less"

export default function List() {
  // State
  const [apiInfo, setApiInfo] = useState([])
  
  // Hooks
  useEffect(() => {
    const getList = async () => {
      await axios.get("/api/v1/listings")
        .then(response => setApiInfo(response.data))
        .catch(console.warn)
    }
    getList()
  }, []);

  const listings = apiInfo.map((listing, i) => {
    i === 0 ? console.log(listing) : null 
    return (
      <div key={listing.key}>
        <h1>{listing.title}</h1>
      </div>
    )}
  )

  return (
    <section>{listings}</section>
  )
}
