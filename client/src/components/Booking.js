import React from 'react'
import { useNavigate } from 'react-router-dom'

const Booking = ({ booking, deleteBooking }) => {
  const navigate = useNavigate()
  const editBooking = (e, id) => {
    e.preventDefault()
    navigate(`/editBooking/${id}`)
  }

  return (
    <tr key={booking.bookingId} className=''>
      <td className='text-center py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {booking.customerEntity.firstName +
            ' ' +
            booking.customerEntity.lastName}
        </div>
      </td>
      <td className='text-center py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {booking.bookingsCarEntity.modelName}
        </div>
      </td>
      <td className='text-center py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{booking.fromDtTime}</div>
      </td>
      <td className='text-center py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>{booking.retDtTime}</div>
      </td>
      <td className='text-center py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {booking.actualRetDtTime === null ? 'none' : booking.actualRetDtTime}
        </div>
      </td>
      <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
        <a
          className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer'
          onClick={(e, id) => editBooking(e, booking.bookingId)}
        >
          Edit
        </a>
        <a
          className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer'
          onClick={(e, id) => {
            deleteBooking(e, booking.bookingId)
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  )
}

export default Booking
