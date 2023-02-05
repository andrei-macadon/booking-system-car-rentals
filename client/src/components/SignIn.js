import React, { useState } from 'react'
import authService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SignIn = () => {
  const [customerLogin, setCustomerLogin] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const value = e.target.value
    setCustomerLogin({ ...customerLogin, [e.target.name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log(customerLogin)
    authService.signin(customerLogin).then(
      () => {
        if (bookingInfo !== null) {
          navigate('/choosevehicle', { state: bookingInfo })
        } else {
          navigate('/home')
          // window.location.reload()
          setSuccessful(true)
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
        setSuccessful(false)
      }
    )
  }

  const saveIntermediateBookingInformation = (
    intermediateBookingInformation
  ) => {
    console.log(
      'intermediateBookingInfo in Sign In is: ' +
        JSON.stringify(intermediateBookingInformation)
    )
    if (intermediateBookingInformation !== null) {
      localStorage.setItem(
        'intermediateBookingInformation',
        JSON.stringify(intermediateBookingInformation)
      )
    }
  }

  const getBookingInfo = () => {
    return JSON.parse(localStorage.getItem('intermediateBookingInformation'))
  }

  const { state } = useLocation()
  saveIntermediateBookingInformation(state)
  const bookingInfo = getBookingInfo()

  return (
    <div className='bg-grey-200 min-h-screen flex flex-col'>
      <div className='container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          {successful ? (
            <h1 className='mb-8 text-3xl text-center'>
              Welcome back {authService.getCurrentUser()}
            </h1>
          ) : (
            <h1 className='mb-8 text-3xl text-center'>Sign in</h1>
          )}

          {!successful && (
            <div>
              {/*---------------- EMAIL ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Email
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='email'
                    value={customerLogin.email}
                    onChange={(e) => handleChange(e)}
                    placeholder='johndoe@yahoo.com'
                  />
                </div>
              </div>

              {/*---------------- Password ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Password
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='password'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='password'
                    value={customerLogin.password}
                    onChange={(e) => handleChange(e)}
                    placeholder='************'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-1/2 ml-32 text-center py-3 rounded bg-orange-400 text-white hover:bg-orange-600 focus:outline-none my-1'
                onClick={handleLogin}
              >
                {loading && (
                  <span className='spinner-border spinner-border-sm'></span>
                )}
                Login
              </button>

              {message && (
                <div className='form-group'>
                  <div className='alert alert-danger' role='alert'>
                    {message}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <span className='mt-4 '>
          Don't have an account yet?{' '}
          <span
            className='underline text-orange-400 cursor-pointer'
            onClick={(e) => {
              navigate('/signup')
            }}
          >
            Sign Up
          </span>
        </span>
      </div>
    </div>
  )
}

export default SignIn
