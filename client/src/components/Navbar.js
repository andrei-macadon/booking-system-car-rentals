import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useRef } from 'react'
import authService from '../services/auth.service'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loggedUser, setLoggedUser] = useState(false)
  // const [roles, setRoles] = useState(false)

  let selected = useRef({
    home:
      location.pathname === '/' || location.pathname === '/home' ? true : false,
    about: false,
    contact: false,
    signin: location.pathname === '/signin' ? true : false,
    bookings: location.pathname === '/bookingslist' ? true : false,
  })

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
    if (location.pathname === '/' || location.pathname === '/home') {
      selected.current = {
        home: true,
        about: false,
        contact: false,
        signin: false,
        bookings: false,
        payments: false,
      }
    } else if (location.pathname === '/signin') {
      selected.current = {
        home: false,
        about: false,
        contact: false,
        signin: true,
        bookings: false,
        payments: false,
      }
      // console.log(selected.current)
    } else if (location.pathname === '/bookingslist') {
      selected.current = {
        home: false,
        about: false,
        contact: false,
        signin: false,
        bookings: true,
        payments: false,
      }
    } else if (location.pathname === '/payments') {
      selected.current = {
        home: false,
        about: false,
        contact: false,
        signin: false,
        bookings: false,
        payments: true,
      }
    } else {
      // console.log(location.pathname)

      selected.current = {
        home: false,
        about: false,
        contact: false,
        signin: false,
        bookings: false,
        payments: false,
      }
    }
  }, [location])

  // useEffect(() => {
  //   loggedUser !== false &&
  //     loggedUser !== null &&
  //     setRoles(loggedUser.roles)(
  //       loggedUser == false || loggedUser == undefined
  //     ) &&
  //     setRoles(false)
  // }, [loggedUser])
  return (
    <nav className='bg-white shadow-lg sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-7'>
            {
              //<!-- Website Logo -->
            }
            <div>
              <div className='flex items-center py-4 px-2 cursor-pointer'>
                <img
                  src={require('../logos-and-icons/RealLogo.png')}
                  alt='Logo'
                  className='h-20 w-16 mr-2'
                  onClick={() => {
                    selected.current = {
                      home: true,
                      about: false,
                      contact: false,
                      signin: false,
                      bookings: false,
                      payments: false,
                    }
                    navigate('/home')
                  }}
                />
                <span
                  className='font-semibold text-gray-500 text-lg mr-10'
                  onClick={() => {
                    selected.current = {
                      home: true,
                      about: false,
                      contact: false,
                      signin: false,
                      bookings: false,
                      payments: false,
                    }
                    navigate('/home')
                  }}
                >
                  Breeze
                </span>
              </div>
            </div>
            {
              //<!-- Primary Navbar items -->
            }

            <div className='hidden md:flex w-full items-center space-x-1'>
              <ul className='hidden md:flex items-center space-x-1'>
                <li>
                  <NavLink
                    exact
                    to='/'
                    className={
                      selected.current.home === true
                        ? 'py-4 px-2 text-gray-500 border-b-4 border-orange-300 font-semibold'
                        : 'py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                    }
                    onClick={() => {
                      selected.current = {
                        home: true,
                        about: false,
                        contact: false,
                        signin: false,
                        bookings: false,
                        payments: false,
                      }
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to='/about'
                    className='py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to='/contact'
                    className='py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                  >
                    Contact Us
                  </NavLink>
                </li>
                {/* {console.log('loggedUser is ' + loggedUser)} */}
                {(loggedUser === false || loggedUser === null) && (
                  <li>
                    {/* {console.log(selected)} */}
                    <NavLink
                      exact
                      to='/signin'
                      className={
                        selected.current.signin === true
                          ? 'py-4 px-2 text-gray-500 border-b-4 border-orange-300 font-semibold'
                          : 'py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                      }
                      onClick={() => {
                        selected.current = {
                          home: false,
                          about: false,
                          contact: false,
                          signin: true,
                          bookings: false,
                          payments: false,
                        }
                      }}
                    >
                      Sign In
                    </NavLink>
                  </li>
                )}
                {/* {roles !== false &&
                  roles !== undefined &&
                  roles.map((role) => {
                    console.log('the role is: ' + role)
                  })} */}
                {console.log(loggedUser)}
                {loggedUser !== false &&
                  loggedUser !== undefined &&
                  loggedUser !== null &&
                  loggedUser.roles.includes('ADMIN') && (
                    <li>
                      <NavLink
                        exact
                        to='/bookingslist'
                        className={
                          selected.current.bookings === true
                            ? 'py-4 px-2 text-gray-500 border-b-4 border-orange-300 font-semibold'
                            : 'py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                        }
                        onClick={() => {
                          selected.current = {
                            home: false,
                            about: false,
                            contact: false,
                            signin: false,
                            bookings: true,
                            payments: false,
                          }
                        }}
                      >
                        Bookings
                      </NavLink>
                    </li>
                  )}
                {loggedUser !== false &&
                  loggedUser !== undefined &&
                  loggedUser !== null &&
                  loggedUser.roles.includes('ADMIN') && (
                    <li>
                      <NavLink
                        exact
                        to='/payments'
                        className={
                          selected.current.payments === true
                            ? 'py-4 px-2 text-gray-500 border-b-4 border-orange-300 font-semibold'
                            : 'py-4 px-2 text-gray-500 font-semibold hover:text-orange-300 transition duration-300'
                        }
                        onClick={() => {
                          selected.current = {
                            home: false,
                            about: false,
                            contact: false,
                            signin: false,
                            bookings: false,
                            payments: true,
                          }
                        }}
                      >
                        Payments
                      </NavLink>
                    </li>
                  )}
              </ul>
            </div>
          </div>
          {/* {console.log(loggedUser)} */}
          {loggedUser && (
            <div className='flex items-center justify-around py-4 px-2'>
              <img
                src={require('../logos-and-icons/user-icon-image-placeholder.jpg')}
                alt='UserIcon'
                className='w-6 h-6 mx-3'
              />
              <span className=' text-gray-700 font-medium'>
                {loggedUser.firstName + ' ' + loggedUser.lastName}
              </span>
              <span
                className='ml-10 text-gray-400 font-bold cursor-pointer'
                onClick={() => {
                  authService.logout()
                  setLoggedUser(false)
                }}
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
