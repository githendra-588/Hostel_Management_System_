import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import FooterPage from "../FooterPage";
import { toast } from "react-toastify";

const HostelHomePage = () => {
  // document.getElementById("hamburger").onclick = function toggleMenu() {
  //     const navToggle = document.getElementsByClassName("toggle");
  //     for (let i = 0; i < navToggle.length; i++) {
  //       navToggle.item(i).classList.toggle("hidden");
  //     }
  //   };
  
  const user= JSON.parse(sessionStorage.getItem("hostel"))
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
            to={"/hostel"}
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
            to="view-rooms"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
          >
            Rooms
          </NavLink>
          <NavLink
            to={"food-package"}
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
          >
            Food Packages
          </NavLink>
          <NavLink
            to={"view-bookings"}
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
          >
            Bookings
          </NavLink>
          <NavLink
            to={"transactions"}
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
          >
            Transactions
          </NavLink>
          <NavLink
            to={"feedbacks"}
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3   "
          >
            Feedbacks
          </NavLink>
        </div>
        <NavLink
          to="profile"
          title="Profile"
          className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right rounded-full hover:bg-blue-500 text-amber-950 md:rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // height="24px"
            viewBox="0 -960 960 960"
            // width="24px"
            fill="currentColor"
            className="w-12 rounded-full"
          >
            <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
          </svg>
          {/* <img src="/hostelhub.webp" alt="" className="w-12 rounded-full" /> */}
        </NavLink>
      </nav>
      <div className="min-h-screen">
        {location.pathname === "/hostel" ? (
          <div className="min-h-screen bg-amber-50">
            <p className=" text-center pt-36 text-3xl font-bold">
              {user?.Hostel_Name}
            </p>
          </div>
        ) : (
          ""
        )}
        <Outlet />
      </div>
      <div className="">
        <FooterPage />
      </div>
    </div>
  );
};

export default HostelHomePage;
