export const ADD_EMAIL = 'userData/ADD_EMAIL'

const initialState = {
  emailAddress: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMAIL:
      return {
        ...state,
        emailAddress: action.value
      }

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
