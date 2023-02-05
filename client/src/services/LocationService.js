import axios from 'axios'
import authHeader from './auth-header'

const LOCATION_API_BASE_URL = 'http://localhost:8080/api/v1/locations'

class LocationService {
  getAllLocations = () => {
    return axios.get(LOCATION_API_BASE_URL)
  }
}

export default new LocationService()
