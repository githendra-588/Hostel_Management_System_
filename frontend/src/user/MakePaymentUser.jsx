import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';

const MakePaymentUser = () => {
  const user= JSON.parse(sessionStorage.getItem('user'));
const {hostelId} = useParams();
  const {state}=useLocation();
  const rooms= state.room;
  const food= state.food;
  const navigateTo = useNavigate();
  // const total=rooms&&rooms.reduce((acc,curr)=>acc+curr.Rent,0)+food&&food.reduce((acc,curr)=>acc+curr.Package_Price,0);
  const [totalAmount, setTotalAmount]=useState(0);
  const [roomId, setRoomId]=useState();
  const [packageId, setPackageId]=useState();
  useEffect(() => {
    const selectedRoom = rooms.find(room => room._id === roomId);
    const selectedFoodPackage = food.find(pkg => pkg._id === packageId);
    const roomRent = selectedRoom ? parseFloat(selectedRoom.Rent) : 0;
    const foodPrice = selectedFoodPackage ? parseFloat(selectedFoodPackage.Package_Price) : 0;
    
    setTotalAmount(roomRent + foodPrice);
  }, [roomId, packageId, rooms, food]);
  const [formData, setFormData] =useState({});
  const handleFormDataChange = (e) => {
  
    setFormData({...formData, [e.target.name]: e.target.value, Amount: totalAmount });
     
  }  

const handleSubmit=async(e)=>{
  e.preventDefault();
 
  console.log(formData);
  try {
    const response= await AxiosInstance.post(`/users/bookhostel/${user._id}/${hostelId}/${roomId}/${packageId}`, formData)
    console.log(response.data);
    toast.success('Payment successful, you successfully booked your hostel')
   navigateTo('/user/view-bookings')
  } catch (error) {
    toast.error('Failed to book your hostel. Please try again.')

    console.log(error);
   
  }
}
  return ( <div className='p-10'>
    <div className='px-36 '>
      <form onSubmit={handleSubmit} >
         <div className="px-36 py-4 border w-4/5">
         <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="card-number"
      >
        Select Room 
      </label>
      <select
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card-number"
        name='roomId'
      onChange={
        (e)=>setRoomId(e.target.value)
      }
      >
        <option value="">Select</option>
       {rooms&&rooms.map(room=><option key={room._id} value={room._id}>{room.Room_Number}, Rent: {room.Rent} Rs.</option>)}
      </select>
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="food"
      >
        Select Food Package 
      </label>
      <select
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card-number"
        name='cardNumber'
      onChange={
        (e)=>setPackageId(e.target.value)
      }
      >
        <option value="">Select</option>
       {food&&food.map(food=><option key={food._id} value={food._id}>{food.Package_Name}, Price: {food.Package_Price} Rs.</option>)}
      </select>
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="card-number"
      >
        Date of Joining
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card-number"
        name='Date_of_Joining'
        type="date"
       onChange={handleFormDataChange}
      />
    </div>
  <h3 className='text-center text-lg font-serif font-bold p-3 text-purple-600'>Make Payment</h3>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="card-number"
      >
        Card Number
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="card-number"
        name='cardNumber'
       onChange={handleFormDataChange}
       minLength="14"
            pattern="\d{14,}"
        
        type="text"
        placeholder="**** **** **** ****"
      />
      <p className="text-xs text-gray-500">card number must be at least 14 digits</p>
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="expiration-date"
      >
        Expiry Date
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       onChange={handleFormDataChange}
       id="expiration-date"
        name='expire'
        type="text" 
        placeholder="MM/YY"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
        CVV
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="cvv" 
       onChange={handleFormDataChange}
       type="password"
        name='cvv'
        maxLength={3}
        placeholder="***"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
        Cardholder Name
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       onChange={handleFormDataChange}
       type="text" 
        placeholder="Full Name" name='cardholder'
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
       Total Amount
      </label>
      <input
        className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text" 
       value={totalAmount}
       readOnly
      />
    </div>
    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
      Pay Now
    </button>
  </div></form>
    </div></div>
  )
}

export default MakePaymentUser