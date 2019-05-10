import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import Message from './message'

const styles = {
  msgContainer: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '420px',
    height: '100%',
    padding: '10px 20px 20px',
    backgroundColor: 'aliceblue'
  }
}

const MessageView = props => {
  const msgContainer = document.getElementById('msgContainer')

  // React renders asynchronously so need to wrap in a timeout.
  // I did not feel this justified converting the func into a
  // class component just to use refs.
  msgContainer && setTimeout(() => msgContainer.scroll(0, 999999), 0)

  return (
    <div id="msgContainer" className={props.classes.msgContainer}>
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
)(withStyles(styles)(MessageView))
