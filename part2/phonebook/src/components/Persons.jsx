const Person = ({person, handleDeletePerson}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => handleDeletePerson(person.id)}>Delete</button></td>
    </tr>
  )
}

const Persons = ({persons, handleDeletePerson}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Delete?</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => {
          return <Person
            key={person.name}
            person={person}
            handleDeletePerson={handleDeletePerson}
          />
        })}
      </tbody>
    </table>
  )  
}

export default Persons