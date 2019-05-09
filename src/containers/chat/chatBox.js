import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './header'
import MessageView from './messageView'
import Sender from './sender'

const ChatBox = props => {
  return (
    <div>
      <Header />
      <MessageView />
      <Sender />
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  emailAddress: chat.emailAddress
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/') }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBox)
