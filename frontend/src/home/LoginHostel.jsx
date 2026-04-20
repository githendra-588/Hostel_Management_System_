import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';

const LoginHostel = () => {
  // login funtion for hostels
  // const hostel= JSON.parse(sessionStorage.getItem('hostel'))
  const navigateTo = useNavigate();
  const handleLoginHostel =async (e) => {
    e.preventDefault();
    // formData to json
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

   await AxiosInstance.post(`/hostels/login`, {Owner_Email: email, password })
     .then((response) => {
      toast.success(response.data.message);
      sessionStorage.setItem('hostel', JSON.stringify(response.data.data));
        // store user data in local storage
        // localStorage.setItem('user', JSON.stringify(response.data));
        navigateTo('/hostel');
      })
     .catch((error) => {
      console.log(error);
        toast.error(error.response.data.error);
      });
    

  }
  return (
    <div>
            <div className="bg-cover bg-center bg-fixed bg-no-repeat " style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hostels.webp")' }}>

<div className="" />
  <div className="h-screen flex justify-center items-center">
    <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl font-bold mb-8 text-center">Login as Hostel Owner</h1>
      <form onSubmit={handleLoginHostel}>
        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
          {/* <a className="text-gray-600 hover:text-gray-800" href="#">
            Forgot your password?
          </a> */}
        </div>
        <div className="mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
       <span className='ml-3'>Not Registered?</span>   <Link className="text-blue-600 hover:text-gray-800 mb-6 " to="/hostel-register">
            click here
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default LoginHostel