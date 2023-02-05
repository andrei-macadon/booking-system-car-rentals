import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import ChooseVehicle from './components/ChooseVehicle'
import RentCar from './components/RentCar'
import BookingsList from './components/BookingsList'
import OrderSent from './components/OrderSent'
import UpdateBooking from './components/UpdateBooking'
import Payments from './components/Payments'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/choosevehicle' element={<ChooseVehicle />} />
          <Route path='/rentcar' element={<RentCar />} />
          <Route path='/bookingslist' element={<BookingsList />} />
          <Route path='/ordersent' element={<OrderSent />} />
          <Route path='/editBooking/:id' element={<UpdateBooking />} />
          <Route path='/payments' element={<Payments />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
