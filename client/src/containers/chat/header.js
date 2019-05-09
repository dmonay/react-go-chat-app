import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Header = props => {
  return (
    <div>
      <h1>SinaiChat™</h1>
      <p>Welcome {props.emailAddress} to the Mount Sinai Chat System!</p>
      <p>There are {props.totalMessages} messages in this chat.</p>
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  totalMessages: chat.totalMessages
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/') }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
