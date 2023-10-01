const Person = ({person}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}

const Persons = ({persons}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => <Person key={person.name} person={person}/>)}
      </tbody>
    </table>
  )  
}

export default Persons