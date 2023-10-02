import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import Notification from './components/notification'
import Form from './components/form'
import People from './components/people'

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
        const data = await personService.getAll()
        setPersons(data)
    }
    fetchData()
  }, [])

  const generateId = () => {
    if (persons.length === 0) return 1
    const maxId = Math.max(...persons.map((person) => person.id))
    return maxId + 1
  }

  const handleDelete = async (person) => {
    const res = confirm(`Seguro de eliminar a ${person.name}??`)
    if (res) {
      try {
        await personService.deletePerson(person.id)
        setPersons(persons.filter((p) => p.id !== person.id))
        setMessage(`${person.name}'s information deleted in the phonebook`)
        setMessageType('delete')
        deleteMessage()
      } catch (error) {
        setMessage(
          `${person.name}'s information already deleted from the server`
        )
        setMessageType('error')
        deleteMessage()
      }
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
