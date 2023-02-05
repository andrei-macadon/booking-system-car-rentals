import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GiGearStickPattern, GiSteeringWheel, GiCarDoor } from 'react-icons/gi'
import { FaTemperatureLow, FaLocationArrow } from 'react-icons/fa'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { BsPeopleFill } from 'react-icons/bs'
import { FcInfo } from 'react-icons/fc'
import ReactTooltip from 'react-tooltip'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import ReactDOMServer, { renderToStaticMarkup } from 'react-dom/server'
import authService from '../services/auth.service'

const ChooseVehicle = () => {
  const navigate = useNavigate()

  const saveIntermediateBookingInformation = (
    intermediateBookingInformation
  ) => {
    localStorage.setItem(
      'intermediateBookingInformation',
      JSON.stringify(intermediateBookingInformation)
    )
  }

  const [loggedUser, setLoggedUser] = useState(false)
  const [message, setMessage] = useState(false)

  const deleteIntermediateBookingInformation = (
    intermediateBookingInformation
  ) => {
    localStorage.removeItem('intermediateBookingInformation')
  }

  const getBookingInfo = () => {
    return JSON.parse(localStorage.getItem('intermediateBookingInformation'))
  }
  // GETTING THE CURRENT STATE AND SAVING THE BOOKING INFO
  const { state } = useLocation()
  saveIntermediateBookingInformation(state)
  // GETTING THE BOOKING INFO
  const bookingInfo = getBookingInfo()

  const availableCars =
    bookingInfo.categoryToFilter === null
      ? bookingInfo.pickupLocationObject.carEntities
      : bookingInfo.pickupLocationObject.carEntities.filter((car) => {
          return car.category.carCategoryName === bookingInfo.categoryToFilter
        })
  const pickupDate = bookingInfo.pickupDateTime
  const dropDate = bookingInfo.dropDateTime

  const getCurrentMonthsNoOfDays = (pickupMonth) => {
    let days = 0
    switch (pickupMonth) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31
        break
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30
        break
      default:
        days = 28
    }
    return days
  }

  const getMonthsDaysDifference = (pickupM, dropM) => {
    let days = 0
    while (dropM - pickupM > 0) {
      days += getCurrentMonthsNoOfDays(pickupM)
      pickupM += 1
    }
    return days
  }

  const getTotalDays = () => {
    // pickupDate numbers
    let dashIndex = pickupDate.indexOf('-')
    const pickupDay = parseInt(pickupDate.substr(0, dashIndex))
    const pickupMonth = parseInt(
      pickupDate.substr(dashIndex + 1, pickupDate.indexOf('-', dashIndex + 1))
    )

    // dropDate numbers
    dashIndex = dropDate.indexOf('-')
    const dropDay = parseInt(dropDate.substr(0, dashIndex))
    const dropMonth = parseInt(
      dropDate.substr(dashIndex + 1, dropDate.indexOf('-', dashIndex + 1))
    )

    const total_days =
      dropMonth === pickupMonth
        ? dropDay - pickupDay
        : getCurrentMonthsNoOfDays(pickupMonth) -
          pickupDay +
          getMonthsDaysDifference(pickupMonth + 1, dropMonth) +
          dropDay
    return total_days
  }

  const getTotalCost = (cost) => {
    const noDays = getTotalDays()
    return noDays * cost
  }

  const getCarDetails = (car) => {
    return (
      <div>
        <ul className='flex flex-col items-start justify-start font-bold'>
          <li>Model Year: {car.modelYear}</li>
          <li>Active Mileage: {car.mileage}</li>
        </ul>
      </div>
    )
  }

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
  }, [])

  const rentCar = (e, car) => {
    // e.preventDefault()
    setLoggedUser(authService.getCurrentUser)
    if (loggedUser !== null) {
      navigate('/rentcar', {
        state: {
          rentedCar: car,
          pickupLocation: bookingInfo.pickupLocationObject,
          dropLocation: bookingInfo.dropLocationObject,
          pickupDateTime: bookingInfo.pickupDateTime,
          dropDateTime: bookingInfo.dropDateTime,
        },
      })
    } else {
      // setMessage('You have to sign in first in order to rent a car!')
      // navigate('/choosevehicle')
      navigate('/signin')
    }
  }

  return (
    <>
      {console.log('the bookingInfo is: ' + JSON.stringify(bookingInfo))}
      <div className='w-full bg-cyan-800 text-white divide-x-3 flex justify-around'>
        {/* map all car categories */}
      </div>
      <div className='bg-slate-100 rounded-lg flex flex-col items-center mx-12 my-12'>
        {message && <span>{message}</span>}
        {availableCars.map((car) => {
          return (
            <>
              <div
                className='my-10 h-72 w-5/6 flex flex-col box-content bg-white border border-slate-900 rounded-lg shadow-xl divide-y-[4px]'
                key={car.carId}
              >
                <div class='mt-4 mx-24 h-1/5 '>
                  <span className='text-xl font-sans text-teal-500 font font-medium'>
                    {car.modelName}
                  </span>
                </div>

                <div className='h-4/5 flex justify-start divide-x-[3px]'>
                  {/* AICI INTRA POZA MASINII SI SPECIFICATIILE */}
                  <div className='w-5/6 flex justify-start items-center'>
                    <div className='flex justify-start mr-12'>
                      <div>
                        <img
                          src={require(`../logos-and-icons/${car.modelName}.png`)}
                          alt='Logo'
                          className='w-min'
                        />
                      </div>
                      <div>
                        <FcInfo
                          data-tip={ReactDOMServer.renderToString(
                            getCarDetails(car)
                          )}
                          data-type='info'
                          data-html={true}
                          className='w-5 h-5'
                        />
                        <ReactTooltip />
                      </div>
                    </div>
                    <div className='text-sm font-sans text-slate-700 w-3/5 h-3/4 flex flex-col items-stretch divide-y-[3px]'>
                      <div className='h-3/5'>
                        <ul className='flex justify-around'>
                          {/* FIRST COLOUMN */}
                          <div className='flex flex-col items-stretch'>
                            <li className='flex justify-start my-2'>
                              {car.transmission === 'Manual Transmission' ? (
                                <GiGearStickPattern
                                  data-tip='Manual Transmission'
                                  className='w-6 h-6 mr-1'
                                />
                              ) : (
                                <GiGearStickPattern
                                  data-tip='Automatic Transmission'
                                  className='w-6 h-6 mr-1'
                                />
                              )}
                              <ReactTooltip />
                              {car.transmission === 'Manual Transmission'
                                ? 'M'
                                : 'A'}
                            </li>
                            <li className='flex justify-start my-2'>
                              <FaTemperatureLow
                                data-tip='Air conditioning'
                                className='w-6 h-6 mr-1'
                              />
                              <ReactTooltip />
                              A/C
                            </li>
                          </div>
                          {/* SECOND COLOUMN */}
                          <div className='flex flex-col items-stretch'>
                            <li className='flex justify-start my-2'>
                              <RiLuggageDepositLine
                                data-tip='Number of luggage'
                                className='w-6 h-6 mr-1'
                              />
                              <ReactTooltip />
                              <span className='mt-0.5'>
                                {car.category.noOfLuggage}
                              </span>
                            </li>
                            <li className='flex justify-start my-2'>
                              <BsPeopleFill
                                data-tip='Number of people'
                                className='w-6 h-6 mr-1'
                              />
                              <ReactTooltip />
                              <span className='mt-0.5'>
                                {car.category.noOfPersons}
                              </span>
                            </li>
                          </div>
                          {/* THIRD COLOUMN*/}
                          <div className='flex flex-col items-stretch'>
                            <li className='flex justify-start my-2'>
                              <GiSteeringWheel
                                className='w-6 h-6 mr-1'
                                data-tip='Servo Stearing'
                              />
                              <ReactTooltip />
                            </li>
                            <li className='flex justify-start my-2'>
                              <GiCarDoor
                                data-tip='Number of doors'
                                className='w-6 h-6 mr-1'
                              />
                              <ReactTooltip />
                              <span className='mt-0.5'>
                                {car.category.noOfDoors}
                              </span>
                            </li>
                          </div>
                        </ul>
                      </div>
                      <div className='flex ml-8 justify-start items-center h-2/5 font-sans'>
                        <FaLocationArrow className='w-4 h-4 mr-4' />
                        Selected Pickup Location:{' '}
                        {bookingInfo.pickupLocationObject.locationName}
                        <span className='text-slate-600 font-bold ml-4'>
                          {bookingInfo.pickupDateTime}
                          {parseInt(
                            bookingInfo.pickupDateTime
                              .substr(
                                0,
                                bookingInfo.pickupDateTime.indexOf(':')
                              )
                              .slice(-2)
                          ) < 12
                            ? ' AM'
                            : ' PM'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* AICI INTRA RENT CAR IMPREUNA CU PRETUL */}
                  <div className='w-1/6 flex flex-col items-center justify-around my-9'>
                    <div className='text-2xl font-mono mr-3 font-bold'>
                      <div>€{getTotalCost(car.costPerDay)}</div>
                      <div>
                        <span className='text-sm font-sans text-slate-600'>
                          Total Charge
                        </span>
                      </div>
                    </div>
                    <button
                      className='box-content bg-orange-400 hover:bg-orange-600 rounded-md h-10 w-28 flex justify-center items-center text-white font-serif transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100'
                      onClick={(e) => rentCar(e, car)}
                    >
                      Rent the car
                    </button>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default ChooseVehicle
