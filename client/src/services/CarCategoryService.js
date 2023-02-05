import axios from 'axios'

const CAR_CATEGORY_API_BASE_URL = 'http://localhost:8080/api/v1/carcategory'

class CarCategoryService {
  getAllCarCategories = () => {
    return axios.get(CAR_CATEGORY_API_BASE_URL)
  }
}

export default new CarCategoryService()
