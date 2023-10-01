const Search = ({handleSearchChange, newSearch}) => {
  return <input onChange={handleSearchChange} value={newSearch}/>
}

export default Search