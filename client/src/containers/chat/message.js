import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import systemUser from '../../assets/icons/systemUser.svg'
import defaultPersonUser from '../../assets/icons/defaultPersonUser.svg'

const styles = {
  avatar: {
    width: 45,
    height: 45
  }
}

const getAvatar = (author, classes) => {
  if (author == 'system') {
    return <img alt="System Icon" src={systemUser} className={classes.avatar} />
  }

  return <img alt="System Icon" src={defaultPersonUser} />
}

const Message = props => {
  console.log('my props are: ', props)

  const { classes } = props

  return (
    <div>
      {getAvatar(props.data.author, classes)}
      <span>{props.data.value}</span>
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
)(withStyles(styles)(Message))
