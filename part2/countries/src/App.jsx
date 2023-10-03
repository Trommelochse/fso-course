import { useState, useEffect } from "react"
import axios from 'axios'

import Search from "../components/Search";
import List from "../components/List"
import Details from "../components/Details";

const App = () => {

  const [countries, setCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])
  const [detailCountry, setDetailCountry] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
  },[])

  const handleSearchTextChange = (e) => {
    const text = e.target.value
    const newMatchingCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().match(text.toLowerCase()) ||  country.name.official.toLowerCase().match(text.toLowerCase())
    })
    setMatchingCountries(newMatchingCountries)
    setSearchText(text)
    setDetailCountry(null)
  }

  const handleShowDetails = (country) => {
    setDetailCountry(country)
  }

  const containerStyle = {
    width: 960,
    margin: '0 auto',
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '50px 80px'
  }

  const renderDisplay = () => {
    if (detailCountry) {
      return <Details country={detailCountry}/>
    }
    if (!detailCountry)
    return <List countries={matchingCountries} handleShowDetails={handleShowDetails}/>    
  }

  return (
    <div style={containerStyle}>
      <Search searchText={searchText} handleSearchTextChange={handleSearchTextChange}/>
      <span>{matchingCountries.length} match{matchingCountries.length === 1 ? null : 'es'}</span>
      {renderDisplay()}
    </div>
  )
}

export default App
