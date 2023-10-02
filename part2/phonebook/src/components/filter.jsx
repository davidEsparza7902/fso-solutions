import PropTypes from 'prop-types'
const Filter = ({ filter, handler }) => {
    return (
      <div>
        Filter: <input value={filter} onChange={handler} />
      </div>
    )
}
Filter.propTypes = {
    filter: PropTypes.string,
    handler: PropTypes.func,
}
export default Filter