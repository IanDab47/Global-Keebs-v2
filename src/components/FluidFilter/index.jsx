const categories = [
  { value: 'Selling' },
  { value: 'Buying' },
  { value: 'Trading' },
  { value: 'Artisan' },
  { value: 'Group Buy' },
  { value: 'Interest Check' },
  { value: 'Store' },
  { value: 'Bulk' },
  { value: 'Service' },
]

const locations = [
  { value: 'AS', name: 'Asia' },
  { value: 'AU', name: 'Australia' },
  { value: 'CA', name: 'Canada' },
  { value: 'CH', name: 'China' },
  { value: 'EU', name: 'Europe' },
  { value: 'GB', name: 'Great Britain' },
  { value: 'KR', name: 'Korea' },
  { value: 'US', name: 'USA' },
]

export default function FluidFilter({ filterType, filterInput, setFilterInput }) {
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
