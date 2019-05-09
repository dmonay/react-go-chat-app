import React, { useState } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { addUserEmail } from '../../modules/chat'
import openSocketConnection from './socket'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

const EmailForm = props => {
  const [userEmailAddress, saveEmailAddress] = useState('')

  const { classes } = props

  const handleSubmit = event => {
    props.addUserEmail(userEmailAddress)
    props.changePage()
    openSocketConnection(userEmailAddress)
    event.preventDefault()
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        id="standard-name"
        type="email"
        className={classes.textField}
        value={userEmailAddress}
        onChange={event => saveEmailAddress(event.target.value)}
        margin="normal"
      />

      <Button type="submit" value="Submit" variant="contained" color="primary">
        Join chat
      </Button>
    </form>
  )
}

const mapStateToProps = ({ chat }) => ({
  emailAddress: chat.emailAddress
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addUserEmail,
      changePage: () => push('/chat')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EmailForm))
