import moment from 'moment'
import React from 'react'
import { url } from '../AxiosInstance'
import { useLocation } from 'react-router-dom'

const ViewSingleUser = () => {
  const location = useLocation();

  const user= location.state
  return (
    <div>
        <div className="">
  <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
    <img
      className="w-32 h-32 rounded-full mx-auto"
      src={`${url}uploads/Users/Profiles/${user?.Profile}`}      // src="https://picsum.photos/200"
      alt="Profile picture"
    />
    <h2 className="text-center text-2xl font-semibold mt-3">{user?.name}</h2>
    <p className="text-center text-gray-600 mt-1">{user?.gender}</p>
   
    <div className="mt-5">
      {/* <h3 className="text-xl font-semibold">Bio</h3> */}
      <p className="text-gray-600 mt-2">
        <span className='text-lg font-bold'>Contact:</span> {user?.email} , {user?.Mobile} <br />
      
      <span className='text-lg font-bold'>Address:</span>{user?.city}, {user?.Address} , {user?.Nationality}
      </p>
      <p className="text-gray-600 mt-2">
        <span className='font-bold'>Dietary Restrictions: </span> {user?.Dietary_Requirements} <br />
        <span className='font-bold'>Room Preference: </span> {user?.Room} <br />
        <span className='font-bold'>Profession: </span> {user?.Profession} <br />
        <span className='font-bold'>Education Details: </span> {user?.Education} <br />
        <span className='font-bold'>Date of Birth: </span> {moment(user?.Date_of_Birth).format("Do MMMM YYYY")} <br />


      </p>
      {/* <div className="flex items-center justify-center mt-5">
        <button onClick={()=>{
          sessionStorage.removeItem('user')
          window.location.href = '/'
        }} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Logout
        </button>
      </div> */}
    </div>
  </div>
</div>

    </div>
  )
}

export default ViewSingleUser