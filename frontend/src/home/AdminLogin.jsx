import React from 'react'
import AxiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  // navigateTo
  const navigateTo = useNavigate();
  // handle login
  const handleLogin =async (e) => {
    e.preventDefault();
  //  formData to json
  const formData = new FormData(e.target);
  const jsonData = Object.fromEntries(formData);
  // axios callback
  await AxiosInstance.post('admin/login', jsonData)
   .then((res) => {
      console.log(res.data, 'admin logged in');
      sessionStorage.setItem('admin', JSON.stringify(res.data));
      // toast message
      toast.success('Admin logged in');
      // set admin data in local storage
      // localStorage.setItem('adminData', JSON.stringify(res.data));
      // redirect to admin
      navigateTo(`/admin`)
      // window.location.href = '/admin/dashboard';
      // set admin data in local storage
      // localStorage.setItem('adminData', JSON.stringify(res.data));
      // redirect to dashboard
      // window.location.href = '/admin/dashboard';
    })
   .catch((error) => {
    // log error with toast 
    console.error(error.response.data.error);
    toast.error(error.response.data.error);
      console.log(error, 'admin login error');
    });
  

  }
  return (
    <div>
            <div className="bg-cover bg-center bg-fixed bg-no-repeat " style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hostels.webp")' }}>

<div className="" />
  <div className="h-screen flex justify-center items-center">
    <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl font-bold mb-8 text-center">Login as Admin</h1>
      <form onSubmit={handleLogin}>
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
            name="email"
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
            name="password"
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
       {/* <span className='ml-3'>Not Registered?</span>   <a className="text-blue-600 hover:text-gray-800 mb-6 " href="/register">
            click here
          </a> */}
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default AdminLogin