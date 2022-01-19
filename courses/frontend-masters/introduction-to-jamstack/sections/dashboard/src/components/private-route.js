import React from 'react'
import { navigate } from 'gatsby'
import { IdentityContextProvider, useIdentityContext } from 'react-netlify-identity'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn

  if (!isLoggedIn && location.pathname !== '/dashboard/login') {
    console.log('Not Logged In')
    navigate('/dashboard/login', { replace: true })
    return null
  }

  return <Component {...rest}></Component>
}

export default PrivateRoute
