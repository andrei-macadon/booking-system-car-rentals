import React, { useState, useEffect } from 'react'
import BarChart from './Charts/BarChart'
import LineChart from './Charts/LineChart'
import PieChart from './Charts/PieChart'
import BookingService from '../services/BookingService'

import { ChartData } from './DataForCharts/ChartData'

const Payments = () => {
  const [viewChart, setViewChart] = useState({
    payment1: true,
    payment2: false,
    payment3: false,
    payment4: false,
  })
  const [loading, setLoading] = useState(true)
  const [bookingsList, setBookingsList] = useState([])

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

  const customersGained = {
    labels: ChartData.map((data) => data.year),
    datasets: [
      {
        label: 'Users gained',
        data: ChartData.map((data) => data.userGain),
        backgroundColor: [
          '#EC6E45',
          '#FFF5C2',
          '#D3E398',
          '#8DCCC1',
          '#F9C87C',
        ],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  }

  const customersLost = {
    labels: ChartData.map((data) => data.year),
    datasets: [
      {
        label: 'Users lost',
        data: ChartData.map((data) => data.userLost),
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  }

  const profitMade = {
    labels: ChartData.map((data) => {
      return data.year
    }),
    datasets: [
      {
        label: 'Profit',
        data: ChartData.map((data) => {
          return data.profit
        }),
        backgroundColor: [
          '#ff4b3c',
          '#ff7b3c',
          '#ffad1f',
          '#96daff',
          '#5e9ef4',
        ],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  }

  const insuranceDistributionCount = [
    {
      coverageType: 'Basic',
      count: 0,
    },
    {
      coverageType: 'Medium',
      count: 0,
    },
    {
      coverageType: 'Premium',
      count: 0,
    },
  ]
  const [insuranceDistributionData, setInsuranceDistributionData] = useState({})
  useEffect(() => {
    const insuranceCount = () => {
      if (!loading) {
        bookingsList.map((booking) => {
          booking.carInsurance.coverageType === 'Basic' &&
            insuranceDistributionCount.map((insurance) => {
              if (insurance.coverageType === 'Basic')
                insurance.count = insurance.count + 1
            })
          booking.carInsurance.coverageType === 'Medium' &&
            insuranceDistributionCount.map((insurance) => {
              if (insurance.coverageType === 'Medium')
                insurance.count = insurance.count + 1
            })
          booking.carInsurance.coverageType === 'Premium' &&
            insuranceDistributionCount.map((insurance) => {
              if (insurance.coverageType === 'Premium')
                insurance.count = insurance.count + 1
            })
        })
        setInsuranceDistributionData({
          labels: insuranceDistributionCount.map((insurance) => {
            return insurance.coverageType
          }),
          datasets: [
            {
              label: 'Insurance Distribution',
              data: insuranceDistributionCount.map((insurance) => {
                return insurance.count
              }),
              backgroundColor: ['#e7d868', '#5c3bc9', '#b43a3a'],
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        })
      }
    }
    insuranceCount()
  }, [loading])

  const [userData, setUserData] = useState(customersGained)
  console.log(insuranceDistributionCount)
  const handleChangeInViewChart = (e) => {
    if (e.target.name === 'payment1_true') {
      setViewChart({
        payment1: true,
        payment2: false,
        payment3: false,
        payment4: false,
      })
      setUserData(customersGained)
    } else if (e.target.name === 'payment2_true') {
      setViewChart({
        payment1: false,
        payment2: true,
        payment3: false,
        payment4: false,
      })
      setUserData(customersLost)
    } else if (e.target.name === 'payment3_true') {
      setViewChart({
        payment1: false,
        payment2: false,
        payment3: true,
        payment4: false,
      })
      setUserData(profitMade)
    } else if (e.target.name === 'payment4_true') {
      setViewChart({
        payment1: false,
        payment2: false,
        payment3: false,
        payment4: true,
      })
      !loading && setUserData(insuranceDistributionData)
    }
  }

  return (
    <>
      <div className='h-screen'>
        {/* The bar where you can choose your preferred chart for visualization */}
        <div className='flex w-full divide-x-2 h-1/6 box-content border mt-4'>
          <div
            className='box-content w-1/4'
            name='payment1_true'
            onClick={(e) => handleChangeInViewChart(e)}
          >
            {viewChart.payment1 ? (
              <button
                className='bg-orange-500 h-full w-full flex justify-center items-center rounded'
                name='payment1_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Customers gained through the years
              </button>
            ) : (
              <button
                className='hover:bg-orange-300 transition ease-in-out delay-50 h-full w-full flex justify-center items-center rounded'
                name='payment1_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Customers gained through the years
              </button>
            )}
          </div>
          <div className='box-content w-1/4' name='payment2_true'>
            {viewChart.payment2 ? (
              <button
                className='bg-orange-500 h-full w-full flex justify-center items-center rounded'
                name='payment2_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Customers lost through the years
              </button>
            ) : (
              <button
                className='hover:bg-orange-300 transition ease-in-out delay-50 h-full w-full flex justify-center items-center rounded'
                name='payment2_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Customers lost through the years
              </button>
            )}
          </div>
          <div className='box-content w-1/4' name='payment3_true'>
            {viewChart.payment3 ? (
              <button
                className='bg-orange-500 h-full w-full flex justify-center items-center rounded'
                name='payment3_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Profit Distribution across years
              </button>
            ) : (
              <button
                className='hover:bg-orange-300 transition ease-in-out delay-50 h-full w-full flex justify-center items-center rounded'
                name='payment3_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Profit Distribution across years
              </button>
            )}
          </div>
          <div className='box-content w-1/4' name='payment4_true'>
            {viewChart.payment4 ? (
              <button
                className='bg-orange-500 h-full w-full flex justify-center items-center rounded'
                name='payment4_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Distribution of insurance across bookings
              </button>
            ) : (
              <button
                className='hover:bg-orange-300 transition ease-in-out delay-50 h-full w-full flex justify-center items-center rounded'
                name='payment4_true'
                onClick={(e) => handleChangeInViewChart(e)}
              >
                Distribution of insurance across bookings
              </button>
            )}
          </div>
        </div>
        {/* The actual chart */}
        <div className='flex justify-center h-5/6 items-start'>
          {viewChart.payment1 || viewChart.payment2 ? (
            <div className='w-1/2 h-1/2'>
              {viewChart.payment1 && <BarChart chartData={userData} />}
              {viewChart.payment2 && <LineChart chartData={userData} />}
            </div>
          ) : (
            <div className='w-1/3 h-1/3'>
              <PieChart chartData={userData} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Payments
