import React, { useState } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a4bace'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const Sender = props => {
  const [messageText, saveMessageText] = useState('')

  const { classes } = props

  const handleSend = event => {
    event.preventDefault()

    // user has not typed in any text
    if (messageText.length === 0) {
      return
    }
    props.socket.send(
      JSON.stringify({
        user: props.emailAddress,
        value: messageText
      })
    )

    // clear out local state
    saveMessageText('')
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
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </form>
  )
}

const mapStateToProps = ({ chat }) => ({
  emailAddress: chat.emailAddress,
  socket: chat.socket
})

export default connect(mapStateToProps)(withStyles(styles)(Sender))
