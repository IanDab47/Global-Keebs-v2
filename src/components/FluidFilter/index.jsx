// Styles
import './style.less'

const categories = [
  { value: 'Selling', bg: '#ff5555', color: null },
  { value: 'Buying', bg: '#40e47b', color: '#f1ffff' },
  { value: 'Trading', bg: '#ff79c6', color: null },
  { value: 'Artisan', bg: '#d8e880', color: '#035' },
  { value: 'Group Buy', bg: '#bd93f9', color: null },
  { value: 'Interest Check', bg: '#bd93f9', color: null },
  { value: 'Store', bg: '#82dae2', color: '#ffffef' },
  { value: 'Bulk', bg: '#82dae2', color: '#ffffef' },
  { value: 'Service', bg: '#82dae2', color: '#ffffef' },
]

const locations = [
  // { value: 'AS', name: 'Asia' },
  { value: 'AU', name: 'Australia' },
  { value: 'CA', name: 'Canada' },
  { value: 'CH', name: 'China' },
  { value: 'EU', name: 'Europe' },
  { value: 'GB', name: 'Great Britain' },
  { value: 'KR', name: 'Korea' },
  { value: 'US', name: 'USA' },
]

export default function FluidFilter({ filterType, filterInput, setFilterInput }) {
  const toggleField = async (filter, value) => {
    // Set Temp array for filters
    let tempFilterArr = filterInput.includes(value) ?
      filterInput.filter(item => item !== value) : null
    // let tempLocationArr = filter === 'location' && locationInput.includes(value) ?
    //   locationInput.filter(location => location !== value) : null

    // Edit filter State based on toggle on or off
    filterInput.includes('') && setFilterInput(filterInput.shift())

    filterInput.includes(value) ?
      setFilterInput(tempFilterArr)
      : 
      setFilterInput([...filterInput, value])

    // Set to all if filter is empty
    if(tempFilterArr && tempFilterArr.length === 0) setFilterInput([''])
  }
  
  return (
    <div className={`${filterType}-filter`}>
      <label>{filterType}</label>
      <div
        className='fluid'
        name={`${filterType}-filter`}
      >
        <p 
          className={ filterInput.includes('') ? 'on' : '' } 
          onClick={e => setFilterInput([''])} 
        >
          All
        </p>
        
        {filterType === 'category' && categories.map(category => (
          <p 
            style={{ '--bg': category.bg, '--color': category.color }}
            className={ filterInput.includes(category.value) ? 'on' : '' } 
            onClick={e => toggleField(filterType, category.value)} 
          >
            {category.value}
          </p>
        ))}

        {filterType !== 'category' && locations.map(category => (
          <p 
            className={ filterInput.includes(category.value) ? 'on' : '' } 
            onClick={e => toggleField(filterType, category.value)} 
          >
            {category.name}
          </p>
        ))}

      </div>
    </div>
  )
}
