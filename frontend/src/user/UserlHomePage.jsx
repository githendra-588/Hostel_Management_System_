import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import FooterPage from '../FooterPage'
import { url } from '../AxiosInstance'
import { toast } from 'react-toastify'

const UserHomePage = () => {
    // document.getElementById("hamburger").onclick = function toggleMenu() {
    //     const navToggle = document.getElementsByClassName("toggle");
    //     for (let i = 0; i < navToggle.length; i++) {
    //       navToggle.item(i).classList.toggle("hidden");
    //     }
    //   };
    const user= JSON.parse(sessionStorage.getItem("user"))
    const location= useLocation();
    const navigateTo=useNavigate();

    console.log(location.pathname);
    useEffect(()=>{
if(!user){
  toast.error("Please Login.....")
navigateTo('/')
}
    }, [navigateTo])
  return (
    <div>
<nav className="flex flex-wrap items-center justify-between p-3  bg-amber-200">
  <img
    src="/hostelhub.webp"
    className="h-16 w-16 rounded"
    alt="hostel photo"
    width={120}
  />
  <div className="flex md:hidden">
    <button id="hamburger">
      <img
        className="toggle block"
        src="/hostelhub.webp"
        width={40}
        height={40}
      />
      <img
        className="toggle hidden"
        src="/hostelhub.webp"
        width={40}
        height={40}
      />
    </button>
  </div>
  <div className="toggle flex justify-between w-full md:w-auto md:flex text-right text-2xl font-bold  mt-5 md:mt-0  ">
    <Link
     to={'/user'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Home
    </Link>
    {/* <NavLink
      to={'hostels'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Hostels
    </NavLink> */}
    <NavLink
      to="view-hostels"
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Hostels
    </NavLink>
    {/* <NavLink
      to={'food-package'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Food Packages
    </NavLink> */}
    <NavLink
      to={'view-bookings'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
    Bookings
    </NavLink>
    <NavLink
      to={'transactions'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Transactions
    </NavLink>
    <NavLink
      to={'feedbacks'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Feedbacks
    </NavLink>
  </div>
  <NavLink
    to='profile'
    title='Profile'
    className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right rounded-full hover:bg-blue-500 text-white md:rounded"
  >
    <img  src={`${url}uploads/Users/Profiles/${user?.Profile}`}  alt=""  className='w-12 rounded-full'/>
  </NavLink>
</nav>
<div className='min-h-screen ' >
 
  {location.pathname==='/user'? <div className='min-h-screen bg-amber-50'><p className=' text-center pt-36 text-lg font-bold'>Welcome {user?.name}</p></div>:""}
    <Outlet/>
</div>
<div className='bg-amber-50'>
  <FooterPage/>
</div>
    </div>
  )
}

export default UserHomePage