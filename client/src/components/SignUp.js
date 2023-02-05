import React, { useState, useRef } from 'react'
import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

const required = (value) => {
  if (value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required.
      </div>
    )
  }
}

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    )
  }
}

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

const isValidDate = (value) => {}

const SignUp = () => {
  const navigate = useNavigate()

  const [customer, setCustomer] = useState({
    // customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    phoneNumber: '',
    country: '',
    city: '',
    street: '',
    zipcode: '',
    driversLicenseNumber: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    licenseIssueCountry: '',
    password: '',
  })

  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setCustomer({ ...customer, [e.target.name]: value })
  }

  const handleCreateAccount = (e) => {
    e.preventDefault()

    // if (checkBtn.current.context._errors.length === 0) {
    AuthService.signup(customer)
      .then(
        (response) => {
          setMessage(response.data)
          setSuccessful(true)
          console.log(response.data)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()

          setMessage(resMessage)
          setSuccessful(false)
        }
      )
      // .then(() => {
      //   navigate('/home')
      // })
      .catch((e) => {
        console.log(e)
      })
    // }
  }

  return (
    <div className='bg-grey-200 min-h-screen flex flex-col'>
      <div className='container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          {successful ? (
            <h1 className='mb-8 text-3xl text-center'>Congratulations</h1>
          ) : (
            <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          )}

          {!successful && (
            <div>
              {/*---------------- FIRST NAME ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    First Name
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='firstName'
                    value={customer.firstName}
                    onChange={handleChange}
                    validations={[required]}
                    placeholder='First Name'
                  />
                </div>
              </div>

              {/*---------------- LAST NAME ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Last Name
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='lastName'
                    value={customer.lastName}
                    onChange={(e) => handleChange(e)}
                    validations={[required]}
                    placeholder='Last Name'
                  />
                </div>
              </div>

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
                    value={customer.email}
                    onChange={(e) => handleChange(e)}
                    validations={[required, validEmail]}
                    placeholder='Email'
                  />
                </div>
              </div>

              {/*---------------- BIRTHDATE ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Birthdate
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='birthdate'
                    value={customer.birthdate}
                    onChange={(e) => handleChange(e)}
                    validations={[required, isValidDate]}
                    placeholder='DD/MM/YYYY'
                  />
                </div>
              </div>

              {/*---------------- Driver's License Number ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Driver's License Number
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='driversLicenseNumber'
                    value={customer.driversLicenseNumber}
                    onChange={(e) => handleChange(e)}
                    placeholder='Drivers License Number'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- Phone Number ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Phone Number
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='phoneNumber'
                    value={customer.phoneNumber}
                    onChange={(e) => handleChange(e)}
                    placeholder='Phone Number'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- Country ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Country
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='country'
                    value={customer.country}
                    onChange={(e) => handleChange(e)}
                    placeholder='Country'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- City ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    City
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='city'
                    value={customer.city}
                    onChange={(e) => handleChange(e)}
                    placeholder='City'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- Street ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Street
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='street'
                    value={customer.street}
                    onChange={(e) => handleChange(e)}
                    placeholder='street'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- Zipcode ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    Zipcode
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='zipcode'
                    value={customer.zipcode}
                    onChange={(e) => handleChange(e)}
                    placeholder='Zipcode'
                    validations={[required]}
                  />
                </div>
              </div>

              {/*---------------- License Issue Date ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    License Issue Date
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='licenseIssueDate'
                    value={customer.licenseIssueDate}
                    onChange={(e) => handleChange(e)}
                    validations={[required, isValidDate]}
                    placeholder='License Issue Date: DD/MM/YYYY'
                  />
                </div>
              </div>

              {/*---------------- License Expiry Date ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    License Expiry Date
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='licenseExpiryDate'
                    value={customer.licenseExpiryDate}
                    onChange={(e) => handleChange(e)}
                    validations={[required, isValidDate]}
                    placeholder='License Expiry Date: DD/MM/YYYY'
                  />
                </div>
              </div>

              {/*---------------- License Issue Country ----------------------*/}
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/4'>
                  <label className='block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'>
                    License Issue Country
                  </label>
                </div>
                <div className='md:w-3/4'>
                  <input
                    type='text'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500'
                    name='licenseIssueCountry'
                    value={customer.licenseIssueCountry}
                    onChange={(e) => handleChange(e)}
                    placeholder='License Issue Country'
                    validations={[required]}
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
                    value={customer.password}
                    onChange={(e) => handleChange(e)}
                    placeholder='************'
                    validations={[required, vpassword]}
                  />
                </div>
              </div>

              <button
                type='submit'
                className='w-1/2 ml-32 text-center py-3 rounded bg-orange-400 text-white hover:bg-orange-600 focus:outline-none my-1'
                onClick={handleCreateAccount}
              >
                Create Account
              </button>

              <div className='text-center text-sm text-gray-600 mt-4'>
                By signing up, you agree to the
                <a
                  className='no-underline border-b border-gray-600 text-gray-600'
                  href='#'
                >
                  {' '}
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  className='no-underline border-b border-gray-600 text-gray-600'
                  href='#'
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          )}

          {message && (
            <div className='form-group text-center'>
              <div
                className={
                  successful ? 'alert alert-success' : 'alert alert-danger'
                }
                role='alert'
              >
                {message}
              </div>
            </div>
          )}
        </div>

        {!successful && (
          <div className='text-grey-dark my-6'>
            Already have an account?
            <a
              className='underline text-orange-400 cursor-pointer'
              onClick={() => navigate('/signin')}
            >
              {' '}
              Log in
            </a>
            .
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp
