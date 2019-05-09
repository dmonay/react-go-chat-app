import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Chat from '../chat'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

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
      <Route exact path="/" component={Home} />
      <Route exact path="/chat" component={Chat} />
    </main>
  </div>
)

export default App
