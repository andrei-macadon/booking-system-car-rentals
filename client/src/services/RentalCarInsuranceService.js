import axios from 'axios'
import authHeader from './auth-header'
const INSURANCE_API_BASE_URL = 'http://localhost:8080/api/v1/insurance'

const getAllInsurance = () => {
  return axios.get(INSURANCE_API_BASE_URL, { headers: authHeader() })
}

export default { getAllInsurance }
