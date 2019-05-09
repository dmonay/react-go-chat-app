import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Message from './message'

const MessageView = props => {
  return (
    <div>
      {props.messages.map(m => (
        <Message key={m.id} data={m} />
      ))}
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  messages: chat.messages
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/') }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageView)
