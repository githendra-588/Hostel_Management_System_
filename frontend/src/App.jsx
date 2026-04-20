import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import HomePage from './home/HomePage'
import Login from './home/Login'
import UserRegister from './home/UserRegister'
import RegisterHostelForm from './home/HostelRegisterForm'
import MyComponent from './home/MyComponent'
import MapComponent from './home/MapComponent'
import HostelHomePage from './hostel/HostelHomePage'
import ErrorPage from './ErrorPage'
import ViewPayment from './hostel/ViewPayment'
import ViewRooms from './hostel/ViewRooms'
import AddRoom from './hostel/AddRoom'
import ViewFoodPackages from './hostel/ViewFoodPackages'
import AddFoodPackage from './hostel/AddFoodPackage'
import HostelProfile from './hostel/HostelProfile'
import ViewBookings from './hostel/ViewBookings'
import AdminHomePage from './admin/AdminHomePage'
import ViewHostels from './admin/ViewHostels'
import ViewUsers from './admin/ViewUsers'
import UserHomePage from './user/UserlHomePage'
import LoginHostel from './home/LoginHostel'
import AdminLogin from './home/AdminLogin'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewHostelsUser from './user/ViewHostelsUser'
import UserProfile from './user/UserProfile'
import ViewSingleHostelUser from './user/ViewSingleHostelUser'
import MakePaymentUser from './user/MakePaymentUser'
import ViewBookingsUser from './user/ViewBookingsUser'
import ViewPaymentUser from './user/ViewPaymentUser'
import FeedBackForm from './user/FeedbackForm'
import ViewFeedbacksUser from './user/ViewFeedbacksUser'
import ViewSingleHostelProfile from './hostel/ViewSingleHostelProfile'
import ViewSingleUser from './hostel/ViewSingleUser'
import ViewFeedbacksHostel from './hostel/ViewFeedbacksHostel'
import ViewPaymentAdmin from './admin/ViewPaymentAdmin'
import ViewFeedbacksAdmin from './admin/ViewFeedbacksAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="">
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<HomePage  />} />
      <Route path="/hostel"  element={<HostelHomePage  />} >
        <Route path="*" element={<ErrorPage />} /> 
        <Route path="view-bookings" element={<ViewBookings />} /> 
        <Route path="profile" element={<ViewSingleHostelProfile />} /> 
        <Route path="add-room" element={<AddRoom />} /> 
        <Route path="view-rooms" element={<ViewRooms />} /> 
        <Route path="food-package" element={<ViewFoodPackages />} /> 
        <Route path="add-food-package" element={<AddFoodPackage />} /> 
        <Route path="transactions" element={<ViewPayment />} /> 
        <Route path="view/:userId" element={<ViewSingleUser />} /> 
      <Route path="feedbacks" element={<ViewFeedbacksHostel />} />

      </Route>
      <Route path='/admin' element={<AdminHomePage/>}>
      <Route path="view-hostels" element={<ViewHostels />} /> 
        <Route path="transactions" element={<ViewPaymentAdmin />} /> 
      <Route path="feedbacks" element={<ViewFeedbacksAdmin />} />
      <Route path="users" element={<ViewUsers />} /> 
      <Route path="*" element={<ErrorPage />} /> 
      </Route>
      <Route path='/user' element={<UserHomePage/>}>
      <Route path="map" element={<MapComponent />} />
      <Route path="profile" element={<UserProfile />} /> 
     
      <Route path="view-hostels" element={<ViewHostelsUser />} /> 
      <Route path="view/:hostelId" element={<ViewSingleHostelUser />} /> 
      <Route path="make-payment/:hostelId" element={<MakePaymentUser />} /> 
      <Route path="*" element={<ErrorPage />} />
      <Route path="feedbacks" element={<ViewFeedbacksUser />} />
      <Route path="feedback/:hostelId" element={<FeedBackForm />} />
      <Route path="transactions" element={<ViewPaymentUser />} />
      <Route path="view-bookings" element={<ViewBookingsUser />} />

      </Route>
      <Route path="/hostel-register"  element={<RegisterHostelForm  />} />
      <Route path="/register"  element={<UserRegister />} />
      <Route path="/login"  element={<Login  />} />
      <Route path="/login-hostel"  element={<LoginHostel  />} />
      <Route path="/login-admin"  element={<AdminLogin  />} />
    <Route path="/map" element={<MapComponent />} />
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
