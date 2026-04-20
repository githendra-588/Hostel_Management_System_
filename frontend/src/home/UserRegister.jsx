import React, { useState } from 'react'
import AxiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const navigateTo=useNavigate()
  const [userData, setUserData] =useState({
    name:"",
    email:"",
     password:"",
     Mobile:"",
     Address:"",
     Date_of_Birth:"",
     gender:"",
     Nationality:"",
     Education:"",
     Room:"",
     city:"",
     Dietary_Requirements:"",
     Profession:"",
     
  })
  const handleChange=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }
  const [image, setImage] =useState()
  const userRegisterSubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("Mobile", userData.Mobile);
    formData.append("Address", userData.Address);
    formData.append("Date_of_Birth", userData.Date_of_Birth);
    formData.append("gender", userData.gender);
   formData.append("Nationality", userData.Nationality);
    formData.append("Education", userData.Education);
    formData.append("Room", userData.Room);
    formData.append("city", userData.city);
    formData.append("Dietary_Requirements", userData.Dietary_Requirements);
    formData.append("Profession", userData.Profession);
    // formData.append("image", image); 

    formData.append("Profile", image)

    
    try {
      const response= await AxiosInstance.post(`/users/register`, formData);
      console.log(response);
      toast.success(response.data.message);
      navigateTo('/login')
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  }

  return (
    <div>
      {/*  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("https://i.imgur.com/xnh5x47.jpg"); */}
     <div className="bg-cover bg-center bg-fixed bg-no-repeat " style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hostels.webp")' }}>
  <div className=" flex justify-center items-center">
    <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/2">
      <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={userRegisterSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="full_name">
            Full Name
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="full_name"
            name='name'
            onChange={handleChange}
            type="text"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            onChange={handleChange}
            type="email"
            name='email'
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4 ">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            id="password"
            name='password'
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4 ">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="city">
            City
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            onChange={handleChange}
            type="text"
            name='city'
            placeholder="Enter City"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="contact_number">
            Contact Number
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact_number"
            onChange={handleChange}
            type="text"
            name='Mobile'
          
            placeholder="Enter your contact number"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="dob">
            Date of Birth
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            id="dob"
            type="date"
            name='Date_of_Birth'
            placeholder="Enter your date of birth"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            id="address"
            placeholder="Enter your address"
            rows="3"
            name='Address'
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="profile_picture">
            Profile Picture
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profile_picture"
            type="file"
            // name='Profile'
            onChange={(e)=>setImage(e.target.files[0])}
            // accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            onChange={handleChange}
            name='gender'
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="nationality">
            Nationality
          </label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nationality"
            onChange={handleChange}
            type="text"
            name='Nationality'
            placeholder="Enter your nationality"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="room_preference">
            Room Preference
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            id="room_preference"
            name='Room'
          >
            <option value="">Select room preference</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="suite">Suite</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="dietary_restrictions">
            Dietary Restrictions
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            id="dietary_restrictions"
            name='Dietary_Requirements'
          >
            <option value="">Select dietary restrictions</option>
            <option value="No Restriction">No Restriction</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten_free">Gluten-Free</option>
            <option value="nut_free">Nut-Free</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="dietary_restrictions">
           Are you working person/student
          </label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Profession"
            onChange={handleChange}
            name='Profession'
          >
            <option value="">Are you working person/student</option>
            <option value="Student">Student</option>
            <option value="Working">Working</option>
            <option value="Job Seeker">Job Seeker</option>
            {/* <option value="nut_free">Nut-Free</option> */}
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <label className="block font-semibold text-gray-700 mb-2" htmlFor="education_details">
            Educational Details
          </label>
          <textarea
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="education_details"
            placeholder="Enter your educational details"
            onChange={handleChange}
            rows="3"
            name='Education'
          ></textarea>
        </div>
        <div className="col-span-2 mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <span className="ml-3">Already Registered?</span>
          <a className="text-blue-600 hover:text-gray-800 mb-6" href="/login">
            Click here to login
          </a>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default UserRegister