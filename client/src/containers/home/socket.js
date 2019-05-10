// Hardcoded for same reason as on the server. See comment there.
const authString = "ch2983r0vhs'.cx8^&#Bf"

const openSocketConnection = (userEmailAddress, actions) => {
  // Create the socket.
  const socket = new WebSocket('wss://localhost:8080/socket')

  // Construct callback when socket opens.
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        authorization: authString,
        user: userEmailAddress
      })
    )
    actions.createSocket(socket)
  }

  // Construct callback when socket receives message.
  socket.onmessage = event => {
    // Log if we ever receive something in onmessage that is not a message.
    if (event.type !== 'message') {
      console.warn(
        'Received a non-message type in `onmessage` over the socket',
        event
      )
      return
    }

    // Derive the payload data from the event.
    let payload
    try {
      payload = JSON.parse(event.data)
    } catch (error) {
      console.warn('Unable to parse socket frame data', event)
      return
    }

    // Add message to our global state.
    actions.addMessage(payload)

    // Increment total count of messages in our global state.
    actions.incrementTotalMsgs()
  }

  // Construct callback when socket closes.
  socket.onclose = closeEvent => {
    const serverTerminatedSocket = !closeEvent.wasClean

    if (serverTerminatedSocket) {
      console.warn('Server terminated socket. Redirecting to error page.')
      actions.socketIsClosed()
      actions.goToError()
    }

    // If our code initiated the socket termination, that means the user has exited the chat,
    // we have flushed the state, and user is now on home page.
  }
}

export default openSocketConnection
