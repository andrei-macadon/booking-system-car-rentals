import React from 'react'
import CarCategoryService from '../services/CarCategoryService'
import { useEffect, useState } from 'react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'
import LocationAndTimeHome from './LocationAndTimeHome'

const CarCategoriesDisplay = () => {
  const [carCategoryLoading, setCarCategoryLoading] = useState(true)
  const [carCategories, setCarCategories] = useState([])
  const [loggedUser, setLoggedUser] = useState(false)
  const [alertInterBookRequest, setAlertInterBookRequest] = useState({
    alertPickupLocationObject: 0,
    alertDropLocationObject: 0,
    alertDropDateTime: 0,
  })

  useEffect(() => {
    setLoggedUser(authService.getCurrentUser)
    const getAllCarCategories = async () => {
      setCarCategoryLoading(true)
      try {
        const response = await CarCategoryService.getAllCarCategories()
        setCarCategories(response.data)
      } catch (error) {
        console.log(error)
      }
      setCarCategoryLoading(false)
    }
    getAllCarCategories()
  }, [])

  const getUniqueCarCategories = () => {
    var uniqueArray = [carCategories[0]]
    carCategories.filter((carCategory) => {
      let categName = carCategory.carCategoryName
      return uniqueArray.filter((element) => {
        return element.carCategoryName === categName
      }).length > 0
        ? false
        : uniqueArray.push(carCategory)
    })
    return uniqueArray
  }

  const checkAlert = (intermediateBookingRequest) => {
    let ok = true
    if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
    } else if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropLocationObject === ''
    ) {
      ok = false
    } else if (
      intermediateBookingRequest.pickupLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
    } else if (
      intermediateBookingRequest.dropLocationObject === '' &&
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
        intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
    } else if (intermediateBookingRequest.pickupLocationObject === '') {
      ok = false
    } else if (intermediateBookingRequest.dropLocationObject === '') {
      ok = false
    } else if (
      intermediateBookingRequest.dropDateTime.substring(0, 10) ===
      intermediateBookingRequest.pickupDateTime.substring(0, 10)
    ) {
      ok = false
    }
    return ok
  }

  let navigate = useNavigate()
  const goToCategory = (e, categName) => {
    e.preventDefault()
    let LATintermBookReq = JSON.parse(localStorage.getItem('LATintBookReq'))
    let isOk = checkAlert(LATintermBookReq)
    console.log(LATintermBookReq)
    if (loggedUser !== false && loggedUser !== null) {
      if (isOk && loggedUser.roles.includes('USER')) {
        console.log('A intrat tata')
        navigate('/choosevehicle', {
          state: {
            pickupDateTime: LATintermBookReq.pickupDateTime,
            dropDateTime: LATintermBookReq.dropDateTime,
            pickupLocationObject: LATintermBookReq.pickupLocationObject,
            dropLocationObject: LATintermBookReq.dropLocationObject,
            categoryToFilter: categName,
          },
        })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  return (
    <>
      {!carCategoryLoading && (
        <div className='w-full h-96 my-20 flex flex-col justify-around items-stretch bg-gray-100 shadow-inner'>
          <span className='text-slate-900 font-serif font-bold text-xl ml-12 mt-8 mb-12'>
            Choose a car that fits your needs
          </span>
          <div className='flex h-full mt-6 mx-10'>
            {getUniqueCarCategories().map((carCategory) => {
              return (
                <>
                  <div
                    key={carCategory.carCategoryId}
                    className='flex flex-col justify-center items-center w-1/2 h-3/4 mx-6'
                  >
                    <div className='flex flex-col justify-center items-center'>
                      <span className='text-slate-900 font-serif text-lg font-bold mr-16'>
                        {carCategory.carCategoryName}
                      </span>
                      <span className='text-slate-600 font-serif'>
                        These range from compact and fuel-efficient city to
                        eco-friendly models
                      </span>
                    </div>
                    <div className='cursor-pointer'>
                      <img
                        src={require(`../carCategoriesPictures/carCategoryPic${carCategory.subcategory}.png`)}
                        alt='Logo'
                        className='w-min'
                        onClick={(e) =>
                          goToCategory(e, carCategory.carCategoryName)
                        }
                      />
                    </div>
                    <div
                      className='flex cursor-pointer'
                      onClick={(e) => {
                        console.log(carCategory)
                        goToCategory(e, carCategory.carCategoryName)
                      }}
                    >
                      <button className='hover:underline text-orange-600 focus:outline-none flex w-full justify-center'>
                        Discover the rest
                      </button>
                      <BsBoxArrowUpRight className='mt-1 ml-1 text-orange-600' />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default CarCategoriesDisplay
