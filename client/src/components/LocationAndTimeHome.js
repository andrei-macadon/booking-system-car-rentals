import React, { useState, useEffect } from 'react'
import '../App.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import TimePicker from 'react-time-picker'
import { HiLocationMarker } from 'react-icons/hi'
import { MdDateRange } from 'react-icons/md'
import LocationService from '../services/LocationService'
import { add } from 'date-fns'
import authService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const LocationAndTimeHome = () => {
  const [isPickupLocActive, setIsPickupLocActive] = useState(false)
  const [isDropLocActive, setIsDropLocActive] = useState(false)
  const [pickupDate, setPickupDate] = useState(new Date())

  const [dropDate, setDropDate] = useState(
    add(new Date(pickupDate), {
      days: 1,
    })
  )
  const [pickupTime, setPickupTime] = useState('10:00')
  const [dropTime, setDropTime] = useState('10:00')
  const [pickupLocation, setPickupLocation] = useState('Choose Pickup Location')
  const [dropLocation, setDropLocation] = useState('Choose Drop Location')
  // const locations = ['React', 'Vue', 'Angular']
  const [locationLoading, setLocationLoading] = useState(true)
  const [locations, setLocations] = useState([])
  const [intermediateBookingRequest, setIntermediateBookingRequest] = useState({
    pickupLocationObject: '',
    dropLocationObject: '',
    pickupDateTime: '',
    dropDateTime: '',
  })
  const [alertInterBookRequest, setAlertInterBookRequest] = useState({
    alertPickupLocationObject: false,
    alertDropLocationObject: false,
    alertDropDateTime: false,
  })

  const [loggedUser, setLoggedUser] = useState(false)

  const checkAlert = () => {
    let ok = true
    if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertPickupLocationObject: true,
        alertDropLocationObject: true,
        alertDropDateTime: true,
      })
    } else if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropLocationObject === ''
    ) {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertPickupLocationObject: true,
        alertDropLocationObject: true,
      })
    } else if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertPickupLocationObject: true,
        alertDropDateTime: true,
      })
    } else if (
      intermediateBookingRequest.dropLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertDropLocationObject: true,
        alertDropDateTime: true,
      })
    } else if (intermediateBookingRequest.pickupLocationObject === '') {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertPickupLocationObject: true,
      })
    } else if (intermediateBookingRequest.dropLocationObject === '') {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertDropLocationObject: true,
      })
    } else if (
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
      intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
      setAlertInterBookRequest({
        ...alertInterBookRequest,
        alertDropDateTime: true,
      })
    }
    return ok
  }

  let navigate = useNavigate()
  const handleSearchCars = (e) => {
    e.preventDefault()
    const isOk = checkAlert()
    console.log('loggedUser is: ' + JSON.stringify(loggedUser))
    console.log('isOk is: ' + isOk)
    if (loggedUser !== null) {
      // const user_role = loggedUser.roles[0]
      if (isOk && loggedUser.roles.includes('USER')) {
        navigate('/choosevehicle', {
          state: {
            pickupDateTime: intermediateBookingRequest.pickupDateTime,
            dropDateTime: intermediateBookingRequest.dropDateTime,
            pickupLocationObject:
              intermediateBookingRequest.pickupLocationObject,
            dropLocationObject: intermediateBookingRequest.dropLocationObject,
            categoryToFilter: null,
          },
        })
      }
    } else {
      if (isOk) {
        navigate('/signin', { state: intermediateBookingRequest })
      }
    }
  }

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
    const fetchLocations = async () => {
      setLocationLoading(true)
      try {
        const response = await LocationService.getAllLocations()
        setLocations(response.data)
      } catch (error) {
        console.log("Couldn't retrieve locations from server: " + error)
      }
      setLocationLoading(false)
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    let pickupDateFormatted = ''
    let dropDateFormatted = ''
    const updateBookingRequest = () => {
      let pickupCurrentMonth = pickupDate.getMonth() + 1
      pickupDateFormatted =
        pickupDate.getDate() +
        '-' +
        pickupCurrentMonth +
        '-' +
        pickupDate.getFullYear() +
        ' ' +
        pickupTime

      let dropCurrentMonth = dropDate.getMonth() + 1
      dropDateFormatted =
        dropDate.getDate() +
        '-' +
        dropCurrentMonth +
        '-' +
        dropDate.getFullYear() +
        ' ' +
        dropTime

      setIntermediateBookingRequest({
        ...intermediateBookingRequest,
        pickupDateTime: pickupDateFormatted,
        dropDateTime: dropDateFormatted,
      })

      if (
        pickupDateFormatted.substring(0, 10) ===
        dropDateFormatted.substring(0, 10)
      ) {
        setAlertInterBookRequest({
          ...alertInterBookRequest,
          alertDropDateTime: true,
        })
      } else {
        setAlertInterBookRequest({
          ...alertInterBookRequest,
          alertDropDateTime: false,
        })
      }
    }
    updateBookingRequest()
    localStorage.setItem(
      'LATintBookReq',
      JSON.stringify({
        pickupDateTime: pickupDateFormatted,
        pickupLocationObject: intermediateBookingRequest.pickupLocationObject,
        dropDateTime: dropDateFormatted,
        dropLocationObject: intermediateBookingRequest.dropLocationObject,
      })
    )
  }, [pickupDate, pickupTime, dropDate, dropTime])

  return (
    <div className='flex flex-col justify-around box-content h-5/6 w-2/4 rounded-lg bg-white text-black mx-20'>
      <div className='h-16 mx-10 mt-10 text-xl text-slate-900 font-medium'>
        <span>
          Best Deals: Fast, Cheap, Quality Cars at your disposal in the city of
          Bucharest
        </span>
      </div>
      <div className='flex space-x-0'>
        {/* Pickup Location */}
        <div className=' flex flex-col space-x-0 h-16 ml-4 dropdown '>
          <div
            className={
              alertInterBookRequest.alertPickupLocationObject === true
                ? 'dropdown-btn-alert mr-2 rounded-lg border-2 border-red-600'
                : 'dropdown-btn mr-2 rounded-lg'
            }
            onClick={() => {
              if (isDropLocActive) {
                setIsDropLocActive(false)
              }
              setIsPickupLocActive(!isPickupLocActive)
            }}
          >
            <HiLocationMarker />
            {pickupLocation}
            <span className='fas fa-caret-down'></span>
          </div>
          {isPickupLocActive && !locationLoading && (
            <div className='dropdown-content'>
              {locations.map((location) => {
                return (
                  <div
                    className='dropdown-item'
                    name='pickupLocationObject'
                    key={location.locationId}
                    onClick={(e) => {
                      setPickupLocation(location.locationName)
                      setIntermediateBookingRequest({
                        ...intermediateBookingRequest,
                        pickupLocationObject: location,
                      })
                      setAlertInterBookRequest({
                        ...alertInterBookRequest,
                        alertPickupLocationObject: false,
                      })
                      setIsPickupLocActive(false)
                    }}
                  >
                    {location.locationName}
                  </div>
                )
              })}
            </div>
          )}

          {/* pickup date */}
          {!isPickupLocActive && (
            <div className='mt-6'>
              <span className='flex font-sans text-slate-600 font-medium mb-2'>
                <div>Pickup Date</div>
                <div className='ml-2 mt-1'>
                  <MdDateRange />
                </div>
              </span>
              <div className='flex divide-x-2'>
                <div>
                  <DatePicker
                    className='hover:bg-orange-400 cursor-pointer border-box rounded-lg bg-gray-200 h-12 w-32 mt-2 text-center font-bold text-slate-800'
                    selected={pickupDate}
                    dateFormat='dd/MM/yyyy'
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    onChange={(date, e) => {
                      setPickupDate(date)
                    }}
                  />
                </div>
                <div className='mt-2 '>
                  <TimePicker
                    onChange={(newpickupTime) => {
                      setPickupTime(newpickupTime)
                    }}
                    value={pickupTime}
                    className='hover:bg-orange-400 cursor-pointer font-bold box-content rounded-lg bg-gray-200 h-12 w-42 text-slate-800'
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drop Location */}
        <div className='flex flex-col h-16 mr-4 dropdown '>
          <div
            className={
              alertInterBookRequest.alertDropLocationObject === true
                ? 'dropdown-btn-alert mr-2 rounded-lg border-2 border-red-600'
                : 'dropdown-btn mr-2 rounded-lg'
            }
            onClick={() => {
              if (isPickupLocActive) {
                setIsPickupLocActive(false)
              }
              setIsDropLocActive(!isDropLocActive)
            }}
          >
            <HiLocationMarker />
            {dropLocation}
            <span className='fas fa-caret-down'></span>
          </div>
          {isDropLocActive && !locationLoading && (
            <div className='dropdown-content'>
              {locations.map((location) => {
                return (
                  <div
                    className='dropdown-item'
                    key={location.locationId}
                    onClick={(e) => {
                      setDropLocation(e.target.textContent)
                      setIntermediateBookingRequest({
                        ...intermediateBookingRequest,
                        dropLocationObject: location,
                      })
                      setAlertInterBookRequest({
                        ...alertInterBookRequest,
                        alertDropLocationObject: false,
                      })
                      setIsDropLocActive(false)
                    }}
                  >
                    {location.locationName}
                  </div>
                )
              })}
            </div>
          )}

          {/* drop date */}
          {!isDropLocActive && (
            <div className='mt-6'>
              <span className='flex font-sans text-slate-600 font-medium mb-2'>
                <div>Drop Date</div>
                <div className='ml-2 mt-1'>
                  <MdDateRange />
                </div>
              </span>
              <div className='flex divide-x-2'>
                <div>
                  <DatePicker
                    className={
                      alertInterBookRequest.alertDropDateTime === true
                        ? 'hover:bg-orange-400 cursor-pointer border-box rounded-lg h-12 w-32 mt-2 text-center font-bold text-slate-800 border-2 border-red-600 bg-red-300'
                        : 'hover:bg-orange-400 cursor-pointer border-box rounded-lg bg-gray-200 h-12 w-32 mt-2 text-center font-bold text-slate-800'
                    }
                    selected={dropDate}
                    dateFormat='dd/MM/yyyy'
                    minDate={add(new Date(pickupDate), {
                      days: 1,
                    })}
                    showDisabledMonthNavigation
                    onChange={(date) => setDropDate(date)}
                  />
                </div>

                <div className='mt-2'>
                  <TimePicker
                    onChange={setDropTime}
                    value={dropTime}
                    className='hover:bg-orange-400 cursor-pointer font-bold box-content rounded-lg bg-gray-200 h-12 w-42 text-slate-800'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*search cars*/}
      <div className='flex flex-col mx-40 justify-center mt-20 mb-4 w-1/2 h-18'>
        {alertInterBookRequest.alertDropDateTime && (
          <div className='ml-4 font-sans text-red-700 font-medium mb-2'>
            You have to book a car for at least a day
          </div>
        )}
        <button
          type='submit'
          className='rounded bg-orange-400 text-white hover:bg-orange-600 focus:outline-none text-xl font-sans w-full h-10'
          onClick={(e) => {
            handleSearchCars(e)
          }}
        >
          Search cars
        </button>
      </div>
    </div>
  )
}

export default LocationAndTimeHome
