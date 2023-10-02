const Notification = ({message}) => {
  if (message === null) {
    return
  }
  const color = message.type === 'error' ? 'red' : 'green'
  const notificationStyle = {
    backgroundColor: '#ededdc',
    fontSize:20,
    color: color,
    border: `2px solid ${color}`,
    margin: 0,
    padding: '20px 12px'
  }
  return <p style={notificationStyle}>{message.content}</p>
}

export default Notification