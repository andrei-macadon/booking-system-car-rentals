import React, { useState, useEffect } from 'react'
import BookingService from '../services/BookingService'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateBooking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const [booking, setBooking] = useState({
    bookingId: id,
    fromDtTime: '',
    retDtTime: '',
    actualRetDtTime: '',
    amount: '',
    bookingsCarEntity: '',
    carInsurance: '',
    noOfHoursLate: '',
    totalLateFee: '',
    customerEntity: '',
    pickupLocation: '',
    dropLocation: '',
    extrasEntity: '',
  })

  const handleChange = (e) => {
    const value = e.target.value
    setBooking({ ...booking, [e.target.name]: value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookingService.getBookingById(booking.bookingId)
        setBooking(response.data)
      } catch (err) {
        console.log(
          "Couldn't retrieve the data of the booking in UpdateBooking"
        )
      }
    }
    fetchData()
  }, [])

  const updateBooking = (e) => {
    // e.preventDefault()
    // console.log(booking.actualRetDtTime)
    BookingService.updateBooking(id, booking.actualRetDtTime)
      .then((response) => {
        setMessage(response.data)
        if (response.data === 'The booking was updated!') {
          navigate('/bookingslist')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='flex justify-center items-center h-auto max-w-2xl mx-auto shadow border-b'>
      <div className='px-8 py-8'>
        <div className='font-thin text-2xl tracking-wider'>
          <h1>Update Booking</h1>
        </div>
        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Pickup Date Time:{' '}
            <span className='font-serif font-bold'>{booking.fromDtTime}</span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Return Date Time:{' '}
            <span className='font-serif font-bold'>{booking.retDtTime}</span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Actual Return Date Time
          </label>
          <input
            type='text'
            name='actualRetDtTime'
            value={booking.actualRetDtTime}
            onChange={(e) => handleChange(e)}
            className='h-10 w-96 border mt-2 px-2 py-2'
            placeholder='yyyy-MM-dd HH:mm:ss'
          ></input>
          {message !== '' && <div className='text-red-600'>{message}</div>}
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Amount:{' '}
            <span className='font-serif font-bold'>€ {booking.amount}</span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Car Model Name:{' '}
            <span className='font-serif font-bold'>
              {booking.bookingsCarEntity.modelName}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Car Insurance Type:{' '}
            <span className='font-serif font-bold'>
              {booking.carInsurance.coverageType}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Number Of Hours Late:{' '}
            <span className='font-serif font-bold'>
              {booking.noOfHoursLate === null ? '0' : booking.noOfHoursLate}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Total Late Fee:{' '}
            <span className='font-serif font-bold'>
              € {booking.totalLateFee === null ? '0' : booking.totalLateFee}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Customer Name:{' '}
            <span className='font-serif font-bold'>
              {booking.customerEntity.firstName +
                ' ' +
                booking.customerEntity.lastName}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Pickup Location:{' '}
            <span className='font-serif font-bold'>
              {booking.pickupLocation.locationName}
            </span>
          </label>
        </div>

        <div className='w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>
            Drop Location:{' '}
            <span className='font-serif font-bold'>
              {booking.dropLocation.locationName}
            </span>
          </label>
        </div>

        <div className='my-2 space-x-4 pt-4'>
          <button
            className='rounded text-white font-semibold bg-orange-400 px-6 py-2 hover:bg-orange-700'
            onClick={updateBooking}
          >
            Update
          </button>
          <button
            onClick={() => navigate('/bookingslist')}
            className='rounded text-white font-semibold bg-red-400 px-6 py-2 hover:bg-red-700'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateBooking
