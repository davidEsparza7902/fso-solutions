import { useState } from 'react'

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
  const handleChange = (e) => {
    setNewName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName }
    if (persons.find((p) => p.name === person.name))
      alert(`${person.name} is already registered`)
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
      <form>
        <div>
          <input value={filter} onChange={handleChangeFilter} />
        </div>
        <h3>Add a new</h3>
        <div>
          name: <input onChange={handleChange} value={newName} />
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
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default App
