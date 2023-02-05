import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { GiGearStickPattern, GiSteeringWheel, GiCarDoor } from 'react-icons/gi'
import { FaTemperatureLow, FaLocationArrow } from 'react-icons/fa'
import { RiLuggageDepositLine } from 'react-icons/ri'
import { BsPeopleFill } from 'react-icons/bs'
import { FcInfo } from 'react-icons/fc'
import { MdCheckBoxOutlineBlank, MdVerifiedUser } from 'react-icons/md'
import { GiCancel } from 'react-icons/gi'
import ReactTooltip from 'react-tooltip'
import RentalCarInsuranceService from '../services/RentalCarInsuranceService'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import '../App.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import authService from '../services/auth.service'
import BookingService from '../services/BookingService'

const RentCar = () => {
  const saveSecondIntermBookingInfo = (secondIntermediateBookingInfo) => {
    localStorage.setItem(
      'secondIntermediateBookingInformation',
      JSON.stringify(secondIntermediateBookingInfo)
    )
  }

  const getSecondIntermBookingInfo = () => {
    return JSON.parse(
      localStorage.getItem('secondIntermediateBookingInformation')
    )
  }
  const { state } = useLocation()
  saveSecondIntermBookingInfo(state)

  const formattedDatetime = (date) => {
    let words = date.split(' ')
    let formDate = words[0] + ' at ' + words[1]
    formDate = parseInt(words[1]) > 12 ? formDate + ' PM' : formDate + ' AM'
    return formDate
  }

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

  const getNoOfDays = (startDate, endDate) => {
    // pickupDate numbers
    let dashIndex = startDate.indexOf('-')
    const pickupDay = parseInt(startDate.substr(0, dashIndex))
    const pickupMonth = parseInt(
      startDate.substr(dashIndex + 1, startDate.indexOf('-', dashIndex + 1))
    )

    // dropDate numbers
    dashIndex = endDate.indexOf('-')
    const dropDay = parseInt(endDate.substr(0, dashIndex))
    const dropMonth = parseInt(
      endDate.substr(dashIndex + 1, endDate.indexOf('-', dashIndex + 1))
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

  const [insuranceLoading, setInsuranceLoading] = useState(true)
  const [insurance, setInsurance] = useState([])
  const [selectedInsurance, setSelectedInsurance] = useState(false)
  const options = ['one', 'two', 'three']
  const defaultOption = options[0]
  const [loggedUser, setLoggedUser] = useState(false)
  const [extras, setExtras] = useState({
    additionalDriver: 0,
    infantSafetySeat: 0,
    childSafetySeat: 0,
    snowChains: 0,
  })
  const [totalExtrasCost, setTotalExtrasCost] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
  }, [])

  useEffect(() => {
    setTotalExtrasCost(
      extras.additionalDriver * 7 +
        extras.infantSafetySeat * 9 +
        extras.childSafetySeat * 9 +
        extras.snowChains * 10
    )
  }, [extras])

  useEffect(() => {
    const fetchInsurances = async () => {
      setInsuranceLoading(true)
      try {
        const response = await RentalCarInsuranceService.getAllInsurance()
        setInsurance(response.data)
      } catch (error) {
        console.log(error)
      }
      setInsuranceLoading(false)
    }
    fetchInsurances()
  }, [])

  const prepareBookingObject = () => {
    let chargeAmount = getTotalCharge()
    let insuranceObject = false
    if (selectedInsurance !== false) {
      insurance.map((theInsurance) => {
        if (theInsurance.coverageType === selectedInsurance) {
          insuranceObject = theInsurance
        }
      })
    }
    //prepare pickupDtTime
    let pickupDateArray = secondBookingInfo.pickupDateTime.split(' ')
    let pickupDateWithoutTime = pickupDateArray[0].split('-')
    let pickupDtTime =
      pickupDateWithoutTime[2] +
      '-' +
      pickupDateWithoutTime[1] +
      '-' +
      pickupDateWithoutTime[0]
    // let pickupDtTime = pickupDateArray[0].split('').reverse().join('')
    pickupDtTime = pickupDtTime + ' ' + pickupDateArray[1] + ':00'
    //prepare dropDtTime
    let dropDateArray = secondBookingInfo.dropDateTime.split(' ')
    let dropDateWithoutTime = dropDateArray[0].split('-')
    let dropDtTime =
      dropDateWithoutTime[2] +
      '-' +
      dropDateWithoutTime[1] +
      '-' +
      dropDateWithoutTime[0]
    // let dropDtTime = dropDateArray[0].split('').reverse().join('')
    dropDtTime = dropDtTime + ' ' + dropDateArray[1] + ':00'
    if (
      insuranceObject !== false &&
      loggedUser !== null &&
      loggedUser !== false
    ) {
      return {
        fromDtTime: pickupDtTime,
        retDtTime: dropDtTime,
        amount: chargeAmount,
        bookingsCarEntity: secondBookingInfo.rentedCar,
        carInsurance: insuranceObject,
        noOfHoursLate: 0,
        totalLateFee: 0,
        customerEntity: loggedUser,
        pickupLocation: secondBookingInfo.pickupLocation,
        dropLocation: secondBookingInfo.dropLocation,
        extrasEntity: extras,
      }
    }
  }

  const checkout = (e) => {
    e.preventDefault()

    const finalBookingObject = prepareBookingObject()
    console.log(
      'The pickupTime Object before renting is: ' +
        finalBookingObject.fromDtTime
    )
    BookingService.addBooking(finalBookingObject).then((response) => {
      console.log(response.data)
      navigate('/ordersent')
    })

    // navigate('/booked', {
    //   state: {
    //     rentedCar: car,
    //     pickupLocation: bookingInfo.pickupLocationObject,
    //     dropLocation: bookingInfo.dropLocationObject,
    //     pickupDateTime: bookingInfo.pickupDateTime,
    //     dropDateTime: bookingInfo.dropDateTime,
    //   },
    // })
  }

  const getTotalCharge = () => {
    let totalCharge = 0
    let noOfDays = getNoOfDays(
      secondBookingInfo.pickupDateTime,
      secondBookingInfo.dropDateTime
    )
    insurance.map((insurance) => {
      if (insurance.coverageType === selectedInsurance) {
        totalCharge += insurance.costPerDay * noOfDays
      }
    })
    totalCharge += noOfDays * secondBookingInfo.rentedCar.costPerDay
    totalCharge += noOfDays * totalExtrasCost
    return totalCharge
  }

  const secondBookingInfo = getSecondIntermBookingInfo()
  return (
    <>
      {console.log(
        'secondBookingInfo is: ' + JSON.stringify(secondBookingInfo)
      )}
      <div className='flex justify-center'>
        <div className='flex justify-around box-content h-auto w-4/5 rounded-lg bg-slate-200 text-black divide-x-[3px]'>
          <div className='flex flex-col justify-around items-stretch w-2/5'>
            {/* CAR PICTURE */}
            <div className='flex justify-center'>
              <img
                src={require(`../logos-and-icons/${secondBookingInfo.rentedCar.modelName}.png`)}
                alt='Logo'
                className='w-min'
              />
            </div>
            {/* PICKUP INFORMATION  */}
            <div className='flex flex-col items-stretch mx-4'>
              <span className='text-slate-700 font-bold my-2'>
                Pickup Information
              </span>
              <span>{secondBookingInfo.pickupLocation.locationName}</span>
              <span>{formattedDatetime(secondBookingInfo.pickupDateTime)}</span>
            </div>
            {/* DROP INFORMATION */}
            <div className='flex flex-col items-stretch mx-4'>
              <span className='text-slate-700 font-bold my-2'>
                Drop Information
              </span>
              <span>{secondBookingInfo.dropLocation.locationName}</span>
              <span>{formattedDatetime(secondBookingInfo.dropDateTime)}</span>
            </div>
            {/* PERIOD OF TIME OF RENTAL */}
            <div className='flex flex-col items-stretch mx-4'>
              <span className='text-slate-700 font-bold my-2'>
                You will rent the car for
              </span>
              <span>
                {getNoOfDays(
                  secondBookingInfo.pickupDateTime,
                  secondBookingInfo.dropDateTime
                )}{' '}
                day(s)
              </span>
            </div>
            {/* MINIMUM DRIVING AGE */}
            <div className='flex flex-col items-stretch mx-4'>
              <span className='text-slate-700 font-bold my-2'>Minimum age</span>
              <span>
                {secondBookingInfo.rentedCar.category.minimumDrivingAge}
              </span>
            </div>

            <div className='flex flex-col items-stretch my-2 mx-4'>
              <div className='text-slate-700 font-bold'>
                Vehicle characteristics
              </div>
              <ul className='flex justify-around mr-20'>
                {/* FIRST COLOUMN */}
                <div className='flex flex-col items-stretch'>
                  <li className='flex justify-start my-2'>
                    {secondBookingInfo.rentedCar.transmission ===
                    'Manual Transmission' ? (
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
                    {secondBookingInfo.rentedCar.transmission ===
                    'Manual Transmission'
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
                      {secondBookingInfo.rentedCar.category.noOfLuggage}
                    </span>
                  </li>
                  <li className='flex justify-start my-2'>
                    <BsPeopleFill
                      data-tip='Number of people'
                      className='w-6 h-6 mr-1'
                    />
                    <ReactTooltip />
                    <span className='mt-0.5'>
                      {secondBookingInfo.rentedCar.category.noOfPersons}
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
                      {secondBookingInfo.rentedCar.category.noOfDoors}
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className='w-3/5 flex flex-col items-center justify-around my-18'>
            {/* INSURANCE INFORMATION AND SELECTION */}
            <div className='box-content flex flex-col items-stretch justify-around w-5/6 h-64 px-4 bg-slate-100 rounded-lg text-slate-700'>
              <h5 className='font-bold text-lg font-mono'>
                Choose your insurance , get rid of any worries
              </h5>
              <div className='flex justify-end mr-52 font-bold'>
                <span className='mr-[90px]'>Excess</span>
                <span>Price</span>
              </div>
              <div className='flex flex-col h-32 justify-around items-stretch'>
                {insurance.map((insurance) => {
                  return (
                    <>
                      <div className='flex justify-between items-center ml-4'>
                        <label>
                          <input
                            className=''
                            type='radio'
                            value={insurance.coverageType}
                            name='insurance'
                            checked={
                              selectedInsurance === insurance.coverageType
                            }
                            onChange={(e) => {
                              setSelectedInsurance(e.target.value)
                              console.log(
                                'The target value is:' + e.target.value
                              )
                              console.log('wtf')
                            }}
                          />
                          <span className='mr-28 ml-6 text-cyan-700  font-bold text-lg font-mono'>
                            {insurance.coverageType}
                          </span>
                        </label>
                        <span className='mr-24  text-center text-slate-700 font-bold'>
                          €{' '}
                          {insurance.excess *
                            getNoOfDays(
                              secondBookingInfo.pickupDateTime,
                              secondBookingInfo.dropDateTime
                            )}
                        </span>
                        <span className='mr-28  text-slate-700 font-bold'>
                          €{' '}
                          {insurance.costPerDay *
                            getNoOfDays(
                              secondBookingInfo.pickupDateTime,
                              secondBookingInfo.dropDateTime
                            )}
                        </span>
                        <Popup
                          trigger={
                            <button className='hover:underline text-orange-600 font-bold'>
                              View Details
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className='modal'>
                              <button className='close' onClick={close}>
                                &times;
                              </button>
                              <div className='header font-bold text-slate-700'>
                                {' '}
                                Insurance includes:{' '}
                              </div>
                              <div className='content'>
                                {insurance.coverageType === 'Basic' && (
                                  <div className='ml-8 mt-4 flex flex-col justify-around items-stretch'>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Basic Collision Damage Protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Theft protection
                                    </div>
                                    <div className='flex my-1'>
                                      <GiCancel className='mr-3 mt-1' />
                                      Personal accident protection
                                    </div>
                                    <div className='flex my-1'>
                                      <GiCancel className='mr-3 mt-1' />
                                      Windscreen, Glass, Lights and Tyres
                                      protection
                                    </div>
                                    <div className='flex my-1'>
                                      <GiCancel className='mr-3 mt-1' />
                                      Personal belongings protection
                                    </div>
                                  </div>
                                )}
                                {insurance.coverageType === 'Medium' && (
                                  <div className='ml-8 mt-4 flex flex-col justify-around items-stretch'>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Basic Collision Damage Protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Theft protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3 mt-1' />
                                      Personal accident protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3 mt-1' />
                                      Windscreen, Glass, Lights and Tyres
                                      protection
                                    </div>
                                    <div className='flex my-1'>
                                      <GiCancel className='mr-3 mt-1' />
                                      Personal belongings protection
                                    </div>
                                  </div>
                                )}
                                {insurance.coverageType === 'Premium' && (
                                  <div className='ml-8 mt-4 flex flex-col justify-around items-stretch'>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Basic Collision Damage Protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3' />
                                      Theft protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3 mt-1' />
                                      Personal accident protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3 mt-1' />
                                      Windscreen, Glass, Lights and Tyres
                                      protection
                                    </div>
                                    <div className='flex my-1'>
                                      <MdVerifiedUser className='mr-3 mt-1' />
                                      Personal belongings protection
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className='actions'>
                                <button
                                  className='button box-content bg-orange-400 hover:bg-orange-600 rounded-lg h-8 w-24 text-slate-700 font-bold'
                                  onClick={() => {
                                    // console.log('modal closed ')
                                    close()
                                  }}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
            {/* EXTRAS */}
            <div className='bg-slate-100 rounded-lg text-slate-700 my-8 w-5/6'>
              <h3 className='text-lg text-slate-700 font-bold font-mono px-4'>
                Supply your car with any of the following extras:
              </h3>
              <div className='flex flex-col justify-around px-8 h-48'>
                <div className='w-full box-content h-8 rounded border-2 flex items-center justify-between'>
                  <span>
                    Additional Driver <span className='text-xs'>with only</span>{' '}
                    <span className='font-bold font-serif'>€ 7</span>
                  </span>
                  <div>
                    <button
                      className='text-xl box-content bg-gray-400 h-full rounded-lg w-7'
                      onClick={(e) => {
                        extras.additionalDriver > 0 &&
                          setExtras({
                            ...extras,
                            additionalDriver: extras.additionalDriver - 1,
                          })
                      }}
                    >
                      -
                    </button>
                    <span className='bg-white box-content text-black mx-4 font-bold font-mono'>
                      {extras.additionalDriver}
                    </span>
                    <button
                      className='text-xl box-content h-full w-7 rounded-lg bg-orange-600 mr-6 text-center'
                      onClick={(e) => {
                        setExtras({
                          ...extras,
                          additionalDriver: extras.additionalDriver + 1,
                        })
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='w-full box-content h-8 rounded border-2 flex items-center justify-between'>
                  <span>
                    Infant Safety Seat{' '}
                    <span className='text-xs'>with only</span>{' '}
                    <span className='font-bold font-serif'>€ 9</span>
                  </span>
                  <div>
                    <button
                      className='text-xl box-content bg-gray-400 h-full rounded-lg w-7'
                      onClick={(e) => {
                        extras.infantSafetySeat > 0 &&
                          setExtras({
                            ...extras,
                            infantSafetySeat: extras.infantSafetySeat - 1,
                          })
                      }}
                    >
                      -
                    </button>
                    <span className='bg-white box-content text-black mx-4 font-bold font-mono'>
                      {extras.infantSafetySeat}
                    </span>
                    <button
                      className='text-xl box-content h-full w-7 rounded-lg bg-orange-600 mr-6 text-center'
                      onClick={(e) => {
                        setExtras({
                          ...extras,
                          infantSafetySeat: extras.infantSafetySeat + 1,
                        })
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='w-full box-content h-8 rounded border-2 flex items-center justify-between'>
                  <span>
                    Child Safety Seat <span className='text-xs'>with only</span>{' '}
                    <span className='font-bold font-serif'>€ 9</span>
                  </span>
                  <div>
                    <button
                      className='text-xl box-content bg-gray-400 h-full rounded-lg w-7'
                      onClick={(e) => {
                        extras.childSafetySeat > 0 &&
                          setExtras({
                            ...extras,
                            childSafetySeat: extras.childSafetySeat - 1,
                          })
                      }}
                    >
                      -
                    </button>
                    <span className='bg-white box-content text-black mx-4 font-bold font-mono'>
                      {extras.childSafetySeat}
                    </span>
                    <button
                      className='text-xl box-content h-full w-7 rounded-lg bg-orange-600 mr-6 text-center'
                      onClick={(e) => {
                        setExtras({
                          ...extras,
                          childSafetySeat: extras.childSafetySeat + 1,
                        })
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='w-full box-content h-8 rounded border-2 flex items-center justify-between'>
                  <span>
                    Snow Chains <span className='text-xs'>with only</span>{' '}
                    <span className='font-bold font-serif'>€ 10</span>
                  </span>
                  <div>
                    <button
                      className='text-xl box-content bg-gray-400 h-full rounded-lg w-7'
                      onClick={(e) => {
                        extras.snowChains > 0 &&
                          setExtras({
                            ...extras,
                            snowChains: extras.snowChains - 1,
                          })
                      }}
                    >
                      -
                    </button>
                    <span className='bg-white box-content text-black mx-4 font-bold font-mono'>
                      {extras.snowChains}
                    </span>
                    <button
                      className='text-xl box-content h-full w-7 rounded-lg bg-orange-600 mr-6 text-center'
                      onClick={(e) => {
                        setExtras({
                          ...extras,
                          snowChains: extras.snowChains + 1,
                        })
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* TOTAL PRICE AND CHECKOUT */}
            <div className='flex flex-col justify-between h-56 w-full items-center'>
              <div className='flex flex-col w-5/6 mb box-content bg-slate-100 rounded-lg h-32 mr-8'>
                <div className='flex justify-between w-full px-16 pt-4'>
                  <h3 className='text-slate-700 text-xl font-bold font-mono'>
                    Total
                  </h3>
                  <h3 className='text-slate-700 text-xl font-bold font-mono'>
                    € {getTotalCharge()}
                  </h3>
                </div>
                <div>
                  <Popup
                    trigger={
                      <button className='hover:underline text-orange-600 font-bold text-sm ml-16'>
                        {'>'} Price breakdown
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className='modal'>
                        <button className='close' onClick={close}>
                          &times;
                        </button>
                        <div className='header font-bold text-black font-mono'>
                          {' '}
                          PRICE BREAKDOWN:{' '}
                        </div>
                        <div className='grid grid-rows-2 divide-y-2'>
                          <div className='flex flex-col content text-black mb-4'>
                            <div className='flex justify-between'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono'>
                                  CAR PRICE FOR THE ENTIRE RENTAL PERIOD
                                </h3>
                                <span className='text-sm'>
                                  The entire booking period (
                                  {getNoOfDays(
                                    secondBookingInfo.pickupDateTime,
                                    secondBookingInfo.dropDateTime
                                  )}
                                  {' day(s) '}x{' '}
                                  {secondBookingInfo.rentedCar.costPerDay})
                                </span>
                              </div>
                              <div className='text-lg font-bold font-mono mr-12 mt-8'>
                                €{' '}
                                {getNoOfDays(
                                  secondBookingInfo.pickupDateTime,
                                  secondBookingInfo.dropDateTime
                                ) * secondBookingInfo.rentedCar.costPerDay}
                              </div>
                            </div>
                            <div className='flex justify-between'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono'>
                                  INSURANCE WITH THE PROTECTION ADDED
                                </h3>
                                <span className='text-sm'>
                                  You have chosen{' '}
                                  <span>{selectedInsurance} </span>
                                  insurance.
                                </span>
                              </div>
                              <div className='mr-12 mt-8 font-mono font-bold text-lg'>
                                €{' '}
                                {insurance.map((insurance) => {
                                  if (
                                    insurance.coverageType === selectedInsurance
                                  ) {
                                    return (
                                      <span>
                                        {insurance.costPerDay *
                                          getNoOfDays(
                                            secondBookingInfo.pickupDateTime,
                                            secondBookingInfo.dropDateTime
                                          )}
                                      </span>
                                    )
                                  }
                                })}
                              </div>
                            </div>
                            <div className='flex justify-between'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono'>
                                  EXTRAS
                                </h3>
                                <span className='text-sm'>
                                  The entire booking period (
                                  {getNoOfDays(
                                    secondBookingInfo.pickupDateTime,
                                    secondBookingInfo.dropDateTime
                                  )}
                                  {' day(s) '}x {totalExtrasCost} (total extras
                                  cost))
                                </span>
                              </div>
                              <div className='mr-12 mt-8 font-mono font-bold text-lg'>
                                €{' '}
                                {getNoOfDays(
                                  secondBookingInfo.pickupDateTime,
                                  secondBookingInfo.dropDateTime
                                ) * totalExtrasCost}
                              </div>
                            </div>
                            <div className='flex justify-between'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono text-green-700'>
                                  EXCESS
                                </h3>
                                <span className='text-sm text-green-700'>
                                  The entire booking period (
                                  {getNoOfDays(
                                    secondBookingInfo.pickupDateTime,
                                    secondBookingInfo.dropDateTime
                                  )}
                                  {' day(s) '}x{' '}
                                  {insurance.map((insurance) => {
                                    if (
                                      insurance.coverageType ==
                                      selectedInsurance
                                    ) {
                                      return insurance.excess
                                    }
                                  })}{' '}
                                  (total extras cost))
                                </span>
                              </div>
                              <div className='mr-12 mt-8 font-mono font-bold text-lg text-green-700'>
                                €{' '}
                                {insurance.map((insurance) => {
                                  if (
                                    insurance.coverageType == selectedInsurance
                                  ) {
                                    return (
                                      insurance.excess *
                                      getNoOfDays(
                                        secondBookingInfo.pickupDateTime,
                                        secondBookingInfo.dropDateTime
                                      )
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='flex justify-between mt-4'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono'>
                                  TOTAL
                                </h3>
                                <span className='text-sm'>
                                  with taxes included
                                </span>
                              </div>
                              <div className='mr-12 mt-8 font-mono font-bold text-lg'>
                                € {getTotalCharge()}
                              </div>
                            </div>
                            <div className='flex justify-between mt-4'>
                              <div className='flex flex-col ml-12 mt-8'>
                                <h3 className='text-lg font-bold font-mono text-green-700'>
                                  TOTAL
                                </h3>
                                <span className='text-sm text-green-700'>
                                  with taxes and excess included
                                </span>
                              </div>
                              <div className='mr-12 mt-8 font-mono font-bold text-lg text-green-700'>
                                €{' '}
                                {insurance.map((insurance) => {
                                  if (
                                    insurance.coverageType === selectedInsurance
                                  ) {
                                    return (
                                      insurance.excess *
                                        getNoOfDays(
                                          secondBookingInfo.pickupDateTime,
                                          secondBookingInfo.dropDateTime
                                        ) +
                                      getTotalCharge()
                                    )
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='actions'>
                          <button
                            className='button box-content bg-orange-400 hover:bg-orange-600 rounded-lg h-8 w-24 text-slate-700 font-bold'
                            onClick={() => {
                              // console.log('modal closed ')
                              close()
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
              <div className>
                <button
                  className='box-content bg-orange-400 hover:bg-orange-600 rounded-md h-10 w-28 flex justify-center items-center text-white font-serif transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 mb-6'
                  onClick={(e) => checkout(e)}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RentCar
