import React, { useEffect, useState } from 'react'
import AxiosInstance from '../AxiosInstance';
import moment from 'moment';

const ViewPaymentAdmin = () => {
  const user = JSON.parse(sessionStorage.getItem("hostel"));
  // setState for bookings
  const [bookings, setBookings] = useState([]);
  const getBookings = async () => {
    try {
      const response = await AxiosInstance.get(`admin/rooms`);
      console.log(response.data);
      setBookings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
        <div className="p-6 overflow-scroll px-0">
  <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead className=''>
      <tr>
        <th className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Transaction ID
          
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Payment
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Amount
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Payer(User Name)
           
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
     {bookings&&bookings.map((item)=> <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                {item.Payment._id}
              </p>
             
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
          
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                {item.Payment.cardHolderName}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
               {/* truncate */}
                {item.Payment.cardNumber?.toString().slice(0, 4)}************************
                {/* {item.Payment.cardNumber} */}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
             {item.Amount} Rs.
            </p>
           
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
           <p>
            {
              item.Owner[0].Hostel_Name
            }
            
           </p>
           <p>
            {
              item.Owner[0].Address
            } , {
              item.Owner[0].city
            }
            
           </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {moment(item.Date).format('Do MMM YYYY HH:mm:ss')}
          </p>
        </td>
     
      </tr>)}
     
    </tbody>
  </table>
</div>

    </div>
  )
}

export default ViewPaymentAdmin