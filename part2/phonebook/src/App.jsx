import { useState } from 'react'
const Filter = ({ filter, handler }) => {
  return (
    <div>
      Filter: <input value={filter} onChange={handler} />
    </div>
  )
}
const Form = ({
  handleChangeName,
  newName,
  handleChangeNumber,
  newNumber,
  handleSubmit,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleChangeName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  )
}

const People = ({ persons }) =>
  persons.map((person) => (
    <p key={person.id}>
      {person.id} || {person.name} - {person.number}
    </p>
  ))

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }
  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName }
    if (persons.find((p) => p.name === person.name))
      alert(`${person.name} is already registered`)
    else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      )
    }
    setNewName('')
    setNewNumber('')
  }
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const personsToShow = persons.filter((person) => {
    const f = filter.toUpperCase()
    return person.name.toUpperCase().startsWith(f)
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleChangeFilter} filter={filter} />

      <h3>Add a new</h3>
      <Form
        handleChangeName={handleChangeName}
        newName={newName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <People persons={personsToShow} />
    </div>
  )
}

export default App
