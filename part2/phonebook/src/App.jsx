import { useState, useEffect } from 'react'
import personsService from './services/personsService'

import Form from './components/Form'
import Search from './components/Search'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => setPersons(persons))
  }, [])

  const nameExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (nameExists(newName)) {
      if (confirm(`${newName} already exists. Update?`)) {
        const newPerson = {name: newName, number: newNumber}
        const id = persons.filter((p) => p.name === newName)[0].id
        personsService
          .update(id, newPerson)
          .then(person => setPersons(persons.map(p => p.id === id ? person : p)))
      }
      setNewName('')
      setNewNumber('')
      return
    }
    
    personsService
      .create({name: newName, number: newNumber})
      .then(person => {
        setPersons([...persons, person])
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeletePerson = (id) => {
    if (window.confirm(`Are you sure?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }    
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
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App