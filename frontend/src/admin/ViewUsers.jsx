import React, { useEffect, useState } from 'react'
import AxiosInstance, { url } from '../AxiosInstance';
import moment from 'moment';

const ViewUsers = () => {
  //  userdata set useState
  const [userData, setUserData] = useState([]);
  const getUsers =async () =>{
  
  await  AxiosInstance.get('admin/users')
    .then(response => {
      console.log(response.data);
      setUserData(response.data.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div>
        <div className="p-6 overflow-scroll px-0">
  <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead className=''>
      <tr>
        <th className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Personal Details
          
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Profile Photo
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           Preferences
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           Educational Details
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Date of Birth
           
          </p>
        </th>
        {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Actions
          </p>
        </th> */}
      </tr>
    </thead>
    <tbody>
      {userData&&userData.map((item)=><tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                {item.name}, {item.gender}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900  opacity-70">
               {item.email}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900  opacity-70">
               {item.Mobile}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                {item.city}, {item.Address}, {item.Nationality}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
src={`${url}uploads/Users/Profiles/${item.Profile}`}
              // src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
              alt="John Michael"
              className="inline-block relative object-cover object-center !rounded-full w-16 h-16 border"
            />
            
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            Dietary_Requirements: {item.Dietary_Requirements}
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
            Profession: {item.Profession} <br />
            Room Preference: {item.Room}
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
           {item.Education}
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
           {moment(item.Date_of_Birth).format('DD MMMM YYYY')}
          </p>
        </td>
        {/* <td className="p-4 border-b border-blue-gray-50">
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </span>
          </button>
        </td> */}
      </tr>)}
     
    </tbody>
  </table>
</div>

    </div>
  )
}

export default ViewUsers