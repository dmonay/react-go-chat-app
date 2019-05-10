import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import Chat from '../chat'
import ErrorPage from '../error'

import Grid from '@material-ui/core/Grid'

const mainStyles = {
  background: 'radial-gradient(#2C5364, #0F2027)',
  minHeight: '100vh'
}

const App = () => (
  <main>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={mainStyles}>
      <Grid item xs={6}>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/error" component={ErrorPage} />
      </Grid>
    </Grid>
  </main>
)

export default App
