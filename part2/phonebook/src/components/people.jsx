import PropTypes from 'prop-types'
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
    
People.propTypes = {
    persons: PropTypes.array,
    handleDelete: PropTypes.func,
}
Person.propTypes = {
    person: PropTypes.object,
    handleDelete: PropTypes.func,
}
export default People