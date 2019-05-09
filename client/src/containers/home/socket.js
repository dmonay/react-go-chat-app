const authString = "ch2983r0vhs'.cx8^&#Bf"

const openSocketConnection = userEmailAddress => {
  console.log('initializing socket conn')

  // Create the socket.
  const socket = new WebSocket('wss://localhost:8080/socket')

  // Construct callback when socket opens.
  socket.onopen = () =>
    socket.send(
      JSON.stringify({
        authorization: authString,
        user: userEmailAddress
      })
    )

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
    console.log('payload:', payload)
  }

  // Construct callback when socket closes.
  socket.onclose = () => {
    console.log('Socket has closed')

    // fire off action here
  }
}

export default openSocketConnection
