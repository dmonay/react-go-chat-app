import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Message from './message'

const messagesThatWillLiveInState = [
  {
    id: 0,
    from: 'system',
    content: 'welcome man',
    timestamp: 12342344343
  },
  {
    id: 1,
    from: 'user',
    content: 'thanks man',
    timestamp: 12342344343434
  }
]

const MessageView = props => {
  return (
    <div>
      {messagesThatWillLiveInState.map((_, i) => {
        return <Message key={i} />
      })}
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
)(MessageView)
