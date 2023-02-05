import React, { useState, useEffect } from 'react'
import BookingService from '../services/BookingService'
import Booking from './Booking'
import authService from '../services/auth.service'

const Bookings = () => {
  const [loading, setLoading] = useState(true)
  const [bookingsList, setBookingsList] = useState([])
  const [loggedUser, setLoggedUser] = useState('n-avem loggedUser')
  const [viewBooking, setViewBooking] = useState({
    in_progress: true,
    finished: false,
  })
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const response = await BookingService.getBookingsList()
        setBookingsList(response.data)
        // console.log('response.data in bookingsList este: ' + response.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchBookings()
  }, [])

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
  }, [])

  const deleteBooking = (e, id) => {
    e.preventDefault()
    console.log('In bookingList loggedUser cam e' + JSON.stringify(loggedUser))
    try {
      BookingService.deleteBooking(id).then((response) => {
        setBookingsList((prevElement) =>
          prevElement.filter((booking) => booking.bookingId !== id)
        )
      })
    } catch (err) {}
  }

  const handleChangeInBookingView = (e) => {
    if (
      e.target.name === 'in_progress_true' ||
      e.target.name === 'in_progress_false'
    ) {
      setViewBooking({
        in_progress: true,
        finished: false,
      })
    } else if (
      e.target.name === 'finished_true' ||
      e.target.name === 'finished_false'
    ) {
      setViewBooking({
        in_progress: false,
        finished: true,
      })
    }
  }

  return (
    <>
      <div className='flex mb-12 mt-4 justify-center'>
        <div className='flex items-center justify-center box-content h-12 w-2/5 shadow border-b text-slate-700 font-bold-font-serif text-lg text-center'>
          {viewBooking.in_progress ? (
            <button
              className='bg-orange-500 h-full w-full rounded'
              name='in_progress_true'
              onClick={(e) => handleChangeInBookingView(e)}
            >
              In progress
            </button>
          ) : (
            <button
              className='hover:bg-orange-300 transition ease-in-out delay-50 rounded h-full w-full'
              name='in_progress_false'
              onClick={(e) => handleChangeInBookingView(e)}
            >
              In progress
            </button>
          )}
        </div>
        <div
          className='flex items-center justify-center box-content h-12 w-2/5 shadow border-b text-slate-700 font-bold-font-serif text-lg text-center'
          onClick={(e) => handleChangeInBookingView(e)}
        >
          {viewBooking.finished ? (
            <button
              className='bg-orange-500 h-full w-full rounded'
              name='finished_true'
              onClick={(e) => handleChangeInBookingView(e)}
            >
              Finished
            </button>
          ) : (
            <button
              className='hover:bg-orange-300 transition ease-in-out delay-50 rounded h-full w-full'
              name='finished_false'
              onClick={(e) => handleChangeInBookingView(e)}
            >
              Finished
            </button>
          )}
        </div>
      </div>
      <div className='flex shadow border-b justify-around'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Customer Name
              </th>
              <th className='font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Rented Car
              </th>
              <th className='font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Pickup Date
              </th>
              <th className='font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Drop Date
              </th>
              <th className='font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>
                Actual Drop Date
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className='bg-white'>
              {bookingsList.map((booking) => {
                console.log('the booking is: ' + JSON.stringify(booking))
                if (
                  booking.actualRetDtTime === null &&
                  viewBooking.in_progress === true
                ) {
                  return (
                    <Booking
                      booking={booking}
                      key={booking.bookingId}
                      deleteBooking={deleteBooking}
                    />
                  )
                } else if (
                  booking.actualRetDtTime !== null &&
                  viewBooking.finished === true
                ) {
                  return (
                    <Booking
                      booking={booking}
                      key={booking.bookingId}
                      deleteBooking={deleteBooking}
                    />
                  )
                }
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  )
}
export default Bookings
