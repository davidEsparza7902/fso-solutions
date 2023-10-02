import PropTypes from 'prop-types'
const Form = ({ handleChangeName, newName, handleChangeNumber, newNumber, handleSubmit }) => {
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

Form.propTypes = {
    handleChangeName: PropTypes.func,
    newName: PropTypes.string,
    handleChangeNumber: PropTypes.func,
    newNumber: PropTypes.string,
    handleSubmit: PropTypes.func,
}

export default Form