import PropTypes from 'prop-types'
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
      error: {
        style: { color: 'red', border: '5px red solid' },
      },
    }
    if (!message) return null
    return (
      <div style={messageTypeMap[messageType]['style']}>
        <h2>{message}</h2>
      </div>
    )
}
Notification.propTypes = {
    message: PropTypes.string,
    messageType: PropTypes.string,
}
export default Notification