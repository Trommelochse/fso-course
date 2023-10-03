const Search = ({searchText, handleSearchTextChange}) => {


  return (
    <div>
      <input type="text" value={searchText} onChange={handleSearchTextChange}/>
    </div>
  )
}

export default Search