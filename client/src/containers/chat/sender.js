import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

const Sender = props => {
  const [messageText, saveMessageText] = useState('')

  const { classes } = props

  const handleSend = event => {
    props.socket.send(
      JSON.stringify({
        user: props.emailAddress,
        value: messageText
      })
    )
    event.preventDefault()
  }

  return (
    <form className={classes.formContainer} onSubmit={handleSend}>
      <TextField
        type="text"
        className={classes.textField}
        value={messageText}
        onChange={event => saveMessageText(event.target.value)}
        margin="normal"
      />

      <Button type="submit" value="Submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
  )
}

const mapStateToProps = ({ chat }) => ({
  emailAddress: chat.emailAddress,
  socket: chat.socket
})

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ sendSocketMessage }, dispatch)

export default connect(mapStateToProps)(withStyles(styles)(Sender))
