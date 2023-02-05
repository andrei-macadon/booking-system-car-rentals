import axios from 'axios'
import authHeader from './auth-header'

const BOOKING_API_BASE_URL = 'http://localhost:8080/api/v1'

const addBooking = (bookingObject) => {
  return axios.post(BOOKING_API_BASE_URL + '/booking', bookingObject, {
    headers: authHeader(),
  })
}

const getBookingsList = () => {
  return axios.get(BOOKING_API_BASE_URL + '/bookings', {
    headers: authHeader(),
  })
}

const deleteBooking = (id) => {
  return axios.delete(BOOKING_API_BASE_URL + '/bookings/' + id, {
    headers: authHeader(),
  })
}

const updateBooking = (id, actualRetDtTime) => {
  return axios.put(BOOKING_API_BASE_URL + '/bookings/' + id, actualRetDtTime, {
    headers: authHeader(),
  })
}

const getBookingById = (id) => {
  return axios.get(BOOKING_API_BASE_URL + '/bookings/' + id, {
    headers: authHeader(),
  })
}

export default {
  addBooking,
  getBookingsList,
  deleteBooking,
  updateBooking,
  getBookingById,
}
