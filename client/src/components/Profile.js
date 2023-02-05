import React from 'react'
import authService from '../services/auth.service'

const Profile = () => {
  const currentUser = authService.getCurrentUser()
  console.log(currentUser)
  return <div>Profile</div>
}

export default Profile
