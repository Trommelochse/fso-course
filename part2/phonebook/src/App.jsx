import { useState, useEffect } from 'react'
import axios from 'axios'

import Form from './components/Form'
import Search from './components/Search'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])


  const nameExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (nameExists(newName)) {
      alert(`${newName} already exists.`)
      setNewName('')
      setNewNumber('')
      return
    }

    const person = {name: newName, number: newNumber}
    const newPersons = [...persons, person]

    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setNewSearch(e.target.value)

  const filteredPersons = persons.filter(person => person.name.match(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter your results</h3>
      <Search handleSearchChange={handleSearchChange} newSearch={newSearch}/>

      <h3>Add New Person</h3>
      <Form
        handleFormSubmit={handleFormSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App