import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, messageType }) => {
  const messageTypeMap = {
    delete: {
      style: { color: 'red', border: '5px red solid' },
    },
    update: {
      style: { color: 'yellow', border: '5px yellow solid' },
    },
    submit: {
      style: { color: 'green', border: '5px green solid' },
    },
  }
  if (!message) return null
  return (
    <div style={messageTypeMap[messageType]['style']}>
      <h2>{message}</h2>
    </div>
  )
}
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
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const deleteMessage = () => {
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 3000)
  }
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
      personService.deletePerson(person.id)
      setMessage(`${person.name}'s information deleted in the phonebook`)
      setMessageType('delete')
      deleteMessage()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName, number: newNumber, id: generateId() }
    const i = persons.findIndex((p) => p.name === person.name)
    if (i !== -1) {
      const conf = confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one`
      )
      if (conf) {
        personService.editPerson(persons[i].id, person)
        const newPersons = [...persons]
        newPersons[i] = person
        setPersons(newPersons)
        setMessage(`${person.name}'s number updated in the phonebook`)
        setMessageType('update')
        deleteMessage()
      }
    } else {
      personService.addPerson(person)
      setPersons(persons.concat(person))
      setMessage(`${person.name} added to the Phonebook`)
      setMessageType('submit')
      deleteMessage()
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
      <Notification message={message} messageType={messageType} />
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
