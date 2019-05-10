import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const ErrorPage = () => {
  return (
    <div>
      <h1>Looks like we're having trouble connecting to the mothership!</h1>
      <Button color="secondary">
        <Link to="/">Take me where the grass is green</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
