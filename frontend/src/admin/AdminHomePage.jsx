import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import FooterPage from '../FooterPage'
import { toast } from 'react-toastify'

const AdminHomePage = () => {
    // document.getElementById("hamburger").onclick = function toggleMenu() {
    //     const navToggle = document.getElementsByClassName("toggle");
    //     for (let i = 0; i < navToggle.length; i++) {
    //       navToggle.item(i).classList.toggle("hidden");
    //     }
    //   };
    const user= sessionStorage.getItem("admin")
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
    className="h-20 w-15"
    alt="ACME"
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
     to={'/admin'}
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
    <NavLink
      to={'users'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
      Users
    </NavLink>
    {/* <NavLink
      to={'view-bookings'}
      className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
    >
    Bookings
    </NavLink> */}
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
onClick={()=>sessionStorage.removeItem('admin')}
    to='/'
    title='Logout'
    className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-700 rounded-full hover:bg-blue-500 text-white md:rounded"
  >
    Logout
  </NavLink>
</nav>
<div className='min-h-screen'>
        {location.pathname === "/admin" ? (
          <div className="min-h-screen bg-amber-50">
            <p className=" text-center pt-36 text-3xl font-bold">
              Welcome Admin
            </p>
          </div>
        ) : (
          ""
        )}
    <Outlet/>
</div>
<div>
  <FooterPage/>
</div>
    </div>
  )
}

export default AdminHomePage