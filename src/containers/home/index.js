import React from 'react'

import EmailForm from './emailForm'

import Grid from '@material-ui/core/Grid'

const Home = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '90vh' }}>
    <Grid item xs={3}>
      <h1>Welcome to SinaiChat!</h1>
      <h3>Please enter your email address:</h3>
      <EmailForm />
    </Grid>
  </Grid>
)

export default Home
