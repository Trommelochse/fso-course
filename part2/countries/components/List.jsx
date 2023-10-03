const List = ({countries, handleShowDetails}) => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    height: 50,
    padding: '10px 20px'
  }

  const labelStyle = {
    display: 'block',
    fontSize: 24
  }

  if (countries.length > 10) {
    return <p>There are too many countries matching your results. Try to narrow it down a bit.</p>
  }
  if (countries.length === 0) {
    return <p>No results are matching your query</p>
  }
  return (
    countries.map((country) => {
      return (
        <div key={country.name.common} style={containerStyle}>
          <label style={labelStyle}>{country.name.common}</label>
          <button onClick={() => handleShowDetails(country)}>Show Details</button>
        </div>
      )
    })
  )
}
export default List