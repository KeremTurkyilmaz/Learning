import React from 'react'
import { Link } from 'gatsby'
import { useIdentityContext } from 'react-netlify-identity'

const Profile = ({ showModal }) => {
  const indentity = useIdentityContext()
  const isLoggedIn = indentity && indentity.isLoggedIn
  const name = indentity && indentity.user && indentity.user.user_metadata && indentity.user.user_metadata.full_name

  return (
    isLoggedIn && (
      <div className="dashboard-header">
        <nav>
          <Link to="/dashboard/secret" activeClassName="active">
            Secret
          </Link>
          <Link to="/dashboard/base" activeClassName="active">
            See Your Base
          </Link>
        </nav>
        <span>
          Logged is as {name}. <button onClick={showModal}>Log Out</button>
        </span>
      </div>
    )
  )
}

export default Profile
