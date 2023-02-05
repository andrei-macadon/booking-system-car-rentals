import axios from 'axios'

const AUTHORIZATION_API_BASE_URL = 'http://localhost:8080/api/auth'

const signup = (customer) => {
  return axios.post(AUTHORIZATION_API_BASE_URL + '/signup', customer)
}

const signin = (customer) => {
  return axios
    .post(AUTHORIZATION_API_BASE_URL + '/signin', customer)
    .then((response) => {
      console.log(response.data)
      if (response.data.jwtToken) {
        localStorage.setItem('customer', JSON.stringify(response.data))
        // console.log(response.data)
        console.log('l a logat')
      }
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('customer')
  localStorage.removeItem('intermediateBookingInformation')
  localStorage.removeItem('secondIntermediateBookingInformation')
  localStorage.removeItem('alertFromCarCateg')
  localStorage.removeItem('LATintBookReq')
  localStorage.removeItem('carCategAlertMessage')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('customer'))
}

export default { signup, signin, logout, getCurrentUser }
