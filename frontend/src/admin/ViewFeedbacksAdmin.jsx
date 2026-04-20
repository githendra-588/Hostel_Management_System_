import React, { useEffect, useState } from 'react'
import AxiosInstance from '../AxiosInstance';
import moment from 'moment';

const ViewFeedbacksAdmin = () => {
  const user = JSON.parse(sessionStorage.getItem('hostel'));
  const [feedbacks, setFeedbacks]=useState()
  const getFeedback =async () =>{

    // fetch data from server
    try {
      const res= await AxiosInstance.get(`admin/feedbacks`);
      console.log(res.data);
      setFeedbacks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
  getFeedback()
  }, [])
  return (
    <div>
        <div className="p-6 overflow-scroll px-0">
  <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead className=''>
      <tr>
        <th className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            #
          
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           Rating
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Message
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           From User
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           To Hostel
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           Date
           
          </p>
        </th>
      
      </tr>
    </thead>
    <tbody>
    {feedbacks&&feedbacks.map((item, index)=>  <tr key={item._id}>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                {index+1}
              </p>
             
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
          
            <div className="flex flex-col">
              <p className="flex antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                {/* {item.Rating} */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={` ${
                      star <= item.Rating ? "text-yellow-400" : "text-gray-200"
                    } text-5xl cursor-pointer`}
                  
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                     className="h-10 w-10"
                      viewBox="0 -960 960 960"
                     
                      fill="currentColor"
                    >
                      <path d="M480-320q48 0 85.5-28.5T620-422H340q17 45 54.5 73.5T480-320ZM380-480q25 0 42.5-17.5T440-540q0-25-17.5-42.5T380-600q-25 0-42.5 17.5T320-540q0 25 17.5 42.5T380-480Zm200 0q25 0 42.5-17.5T640-540q0-25-17.5-42.5T580-600q-25 0-42.5 17.5T520-540q0 25 17.5 42.5T580-480ZM305-704l112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
                    </svg>
                  </span>
                ))}
              </p>
            
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {item.Message}
            </p>
         
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <p>
              {item.User[0].name}
              <br />
              <span className="text-xs text-blue-gray-600">
                {item.User[0].city}, 
                {item.User[0].Address}
              </span>
<br />
{item.User[0].Mobile}, {item.User[0].email}
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            <p>
            {
              item.Hostel[0].Hostel_Name
            }
            
           </p>
           <p>
            {
              item.Hostel[0].Address
            } , {
              item.Hostel[0].city
            }
            
           </p>
            </p>
         
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {moment(item.Date).format('Do MMM YYYY')}
          </p>
        </td>
       
      </tr>)}
    
    </tbody>
  </table>
</div>

    </div>
  )
}

export default ViewFeedbacksAdmin