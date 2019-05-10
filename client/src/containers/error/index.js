import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const ErrorPage = () => {
  return (
    <div style={{ width: '400px' }}>
      <h1 style={{ color: '#bd8ae8' }}>
        Looks like we're having trouble connecting to the mothership!
      </h1>
      <Button style={{ color: '#bd8ae8' }} variant="outlined">
        <Link to="/">Take me where the grass is green</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
