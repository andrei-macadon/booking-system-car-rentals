import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import city from '../logos-and-icons/poza.jpg'
import LocationAndTimeHome from './LocationAndTimeHome'

const Background = () => {
  // const navigate = useNavigate()
  // return (
  //   <div className='flex justify-center'>
  //     <img
  //       src={require('../logos-and-icons/poza.jpg')}
  //       alt='Logo'
  //       className=' w-full'
  //     />
  //   </div>
  // )
  return (
    <div
      className=' pt-28 pl-28'
      style={{
        backgroundImage: `url(${city})`,
        backgroundSize: 'cover',
        height: '100vh',
        color: '#f5f5f5',
      }}
    >
      <LocationAndTimeHome />
    </div>
  )
}

export default Background
