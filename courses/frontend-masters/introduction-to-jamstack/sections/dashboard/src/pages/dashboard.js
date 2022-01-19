import React, { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import { Link, navigate } from 'gatsby'

import IdentityModal from 'react-netlify-identity-widget'

import Layout from '../components/layout'
import Profile from '../components/profile'

import RouteBase from '../components/route-base'
import RouteSecret from '../components/route-secret'
import RouteLogin from '../components/route-login'

import PrivateRoute from '../components/private-route'

import 'react-netlify-identity-widget/styles.css'

const Dashboard = ({ location }) => {
  // State
  const [isVisible, setVisibility] = useState(false)

  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate('/dashboard/login', { replace: true })
    }
  }, [])

  const showModal = () => setVisibility(true)
  const closeModal = () => setVisibility(false)

  return (
    <Layout>
      <Profile showModal={showModal} />
      <Link to="/dashboard">
        <p>This is the dashboard!</p>
      </Link>
      <Router>
        <PrivateRoute component={RouteBase} path="/dashboard/base" />
        <PrivateRoute component={RouteSecret} path="/dashboard/secret" />
        <RouteLogin path="/dashboard/login" showModal={showModal} />
      </Router>
      <IdentityModal showDialog={isVisible} onCloseDialog={closeModal}></IdentityModal>
    </Layout>
  )
}

export default Dashboard
