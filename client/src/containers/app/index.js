import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Chat from '../chat'
import ErrorPage from '../error'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const App = () => (
  <div>
    <div className={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button color="primary">
            <Link to="/">Home</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>

    <main>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '90vh' }}>
        <Grid item xs={6}>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/error" component={ErrorPage} />
        </Grid>
      </Grid>
    </main>
  </div>
)

export default App
