import React from 'react'

import EmailForm from './emailForm'

const homeStyles = {
  backgroundColor: '#c6ddf1',
  padding: '30px',
  borderRadius: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '450px'
}

const Home = () => (
  <div style={homeStyles}>
    <h2 style={{ marginTop: '28px' }}>Welcome to SinaiChat!</h2>

    <p style={{ marginTop: '-5px', fontWeight: 100 }}>
      Please enter your email address:
    </p>

    <EmailForm />
  </div>
)

export default Home
