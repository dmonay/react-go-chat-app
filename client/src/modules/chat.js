export const ADD_EMAIL = 'userData/ADD_EMAIL'
export const INCREMENT_TOTAL_MESSAGES = 'userData/INCREMENT_TOTAL_MESSAGES'
export const ADD_MESSAGE = 'userData/ADD_MESSAGE'
export const CREATE_SOCKET = 'userData/CREATE_SOCKET'
export const SOCKET_CLOSE = 'userData/SOCKET_CLOSE'
export const EXIT_CHAT = 'userData/EXIT_CHAT'

const initialState = {
  emailAddress: '',
  totalMessages: 0,
  socketIsClosed: false,
  socket: null,
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMAIL:
      return {
        ...state,
        emailAddress: action.value
      }

    case INCREMENT_TOTAL_MESSAGES:
      return {
        ...state,
        totalMessages: state.totalMessages + 1
      }

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.value]
      }

    case CREATE_SOCKET:
      return {
        ...state,
        socket: action.value,
        socketIsClosed: false
      }

    case SOCKET_CLOSE:
      return {
        ...state,
        socketIsClosed: true
      }

    case EXIT_CHAT:
      return initialState

    default:
      return state
  }
}

export const addUserEmail = email => {
  return dispatch => {
    dispatch({
      type: ADD_EMAIL,
      value: email
    })
  }
}

export const incrementTotalMsgs = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_TOTAL_MESSAGES
    })
  }
}

export const addMessage = msg => {
  return dispatch => {
    dispatch({
      type: ADD_MESSAGE,
      value: msg
    })
  }
}

export const createSocket = socket => {
  return dispatch => {
    dispatch({
      type: CREATE_SOCKET,
      value: socket
    })
  }
}

export const socketIsClosed = () => {
  return dispatch => {
    dispatch({
      type: SOCKET_CLOSE
    })
  }
}

export const exitChat = socket => {
  // ensure we terminate the socket connection before flushing state
  socket.close()
  return dispatch => {
    dispatch({
      type: EXIT_CHAT
    })
  }
}
