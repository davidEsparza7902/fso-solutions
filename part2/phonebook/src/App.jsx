import { useState, useEffect } from 'react'
import personService from './services/persons'

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
const Person = ({ person, handleDelete }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
      <p>
        {person.id} || {person.name} - {person.number}
      </p>
      <button onClick={() => handleDelete(person)}>Eliminar {person.id}</button>
    </div>
  )
}
const People = ({ persons, handleDelete }) =>
  persons.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ))

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await personService.getAll()
        setPersons(data)
      } catch (error) {
        throw error
      }
    }
    fetchData()
  }, [])
  const generateId = () => {
    const maxId = Math.max(...persons.map((person) => person.id))
    return maxId + 1
  }
  const handleDelete = (person) => {
    const res = confirm(`Seguro de eliminar a ${person.name}??`)
    if (res) {
      setPersons(persons.filter((p) => p.id !== person.id))
      personService.deletePerson(person)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName, number: newNumber, id: generateId() }
    if (persons.find((p) => p.name === person.name))
      alert(`${person.name} is already registered`)
    else {
      personService.addPerson(person)
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }
  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }
  const handleChangeName = (e) => {
    setNewName(e.target.value)
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
      <People persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
