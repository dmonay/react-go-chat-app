import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  headerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '10px 10px 0 0'
  }
}

const Header = props => {
  return (
    <div className={props.classes.headerContainer}>
      <h2 style={{ marginTop: '28px' }}>Welcome {props.emailAddress}!</h2>
      <p style={{ marginTop: '-5px', marginBottom: '26px', fontWeight: 100 }}>
        There are {props.totalMessages} messages in this chat
      </p>
    </div>
  )
}

const mapStateToProps = ({ chat }) => ({
  emailAddress: chat.emailAddress,
  totalMessages: chat.totalMessages
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePage: () => push('/') }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header))
