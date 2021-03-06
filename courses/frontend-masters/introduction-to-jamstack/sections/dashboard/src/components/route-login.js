import React from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import { navigate } from 'gatsby'

const RouteLogin = ({ showModal }) => {
  const indentity = useIdentityContext()

  if (indentity && indentity.isLoggedIn) {
    navigate('/dashboard/secret', { replace: true })
  }

  return (
    <>
      <h1>Log in or Sign Up</h1>
      <button onClick={showModal}>Log In</button>
    </>
  )
}

export default RouteLogin
