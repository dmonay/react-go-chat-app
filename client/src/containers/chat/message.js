import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

import systemUser from '../../assets/icons/systemUser.svg'
import defaultPersonUser from '../../assets/icons/defaultPersonUser.svg'

const styles = {
  msgIcon: {
    flexShrink: 0,
    height: '30px',
    margin: '5px 10px 0 0',
    width: '30px'
  },
  msgBody: {
    boxSizing: 'border-box',
    padding: '10px 15px',
    borderRadius: '4px',
    background: '#e8e8e8',
    color: '#404040',
    fontSize: '1rem',
    lineHeight: '1.5',
    flexGrow: 1
  },
  msgBlockWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 30px',
    maxWidth: '300px'
  }
}

const getMsgBlock = (data, classes) => {
  // messages from the system will appear on the left
  if (data.author === 'system') {
    return (
      <div className={classes.msgBlockWrapper}>
        <img alt="System Icon" src={systemUser} className={classes.msgIcon} />
        <div className={classes.msgBody}>{data.value}</div>
      </div>
    )
  }

  // messages from the user will appear on the right
  return (
    <div style={{ alignSelf: 'flex-end' }} className={classes.msgBlockWrapper}>
      <img
        alt="User Icon"
        src={defaultPersonUser}
        className={classes.msgIcon}
      />
      <div
        style={{ backgroundColor: '#3f51b5', color: '#fff' }}
        className={classes.msgBody}>
        {data.value}
      </div>
    </div>
  )
}

const Message = props => {
  console.log('my props are: ', props)
  return getMsgBlock(props.data, props.classes)
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
