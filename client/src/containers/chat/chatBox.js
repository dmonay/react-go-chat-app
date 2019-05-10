import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import Header from './header'
import MessageView from './messageView'
import Sender from './sender'

import { exitChat } from '../../modules/chat'

const styles = {
  chatWrapper: {
    boxShadow: '13px -2px 20px 10px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    width: '420px',
    height: '600px',
    maxHeight: '600px',
    borderRadius: '10px'
  },
  homeLink: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    color: '#737e83',
    fontSize: '19px'
  }
}

const ChatBox = props => {
  return (
    <div className={props.classes.chatWrapper}>
      <Button
        className={props.classes.homeLink}
        onClick={() => props.exitChat(props.socket)}>
        <Link to="/">
          <img
            alt="back button"
            style={{ opacity: 0.4, filter: 'invert(100%)' }}
            src="https://img.icons8.com/material-outlined/64/000000/circled-left.png"
          />{' '}
          Home
        </Link>
      </Button>
      <Header />
      <MessageView />
      <Sender />
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  socket: chat.socket
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ exitChat }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChatBox))
