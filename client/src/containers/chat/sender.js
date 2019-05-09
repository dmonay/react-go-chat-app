import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Sender = props => {
  return (
    <div>
      <p>This is the sender</p>
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
)(Sender)
