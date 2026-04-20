import React, { useState } from 'react'
import AxiosInstance from '../AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    // HOSTEL getItem sessionStorage getItem
    const hostel = JSON.parse(sessionStorage.getItem('hostel'));
    const [image, setImage]=useState([])
    const [formData, setFormData] = useState({
        Number_of_Beds:0
    });
    // form change event handler
    const handleFormDataChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    const handleFileChange= (e) => {
     setImage(e.target.files);
        // setFormData({...formData, Room_Photos: e.target.files });
    }

    // select options for room type
    const roomTypes = ['Single', 'Double', 'Triple', 'Quad', 'Family'];
    // select options for room status
    const roomStatuses = ['Available', 'Booked', 'Maintenance'];

    // useNavigate
    const navigateTo = useNavigate();
    // handleSubmit
    const handleSubmit =async (e) => {
        e.preventDefault();
        // formDataformData 
        console.log(formData);
        const formDatas = new FormData();
        // append each key-value pair from formData to formDatas
        Object.keys(formData).forEach((key) => {
            if (formData[key]!== null) {
                formDatas.append(key, formData[key]);
            }
        });
    // append room photos multiple times using forof loop
    for (let i = 0; i < image.length; i++) {
        formDatas.append('Room_Photos', image[i]);
    }

    // if (image) {
    //     image.forEach((file) => {
    //         formDatas.append('Room_Photos', file);
    //     });
    // }
    


       try {
        
         // axios post request
         await AxiosInstance.post(`hostels/addroom/${hostel._id}`, formDatas)
          .then((res) => {
             console.log(res.data, 'Room added');
             // toast message
             toast.success('Room added successfully');
             // reset form
            //  e.target.reset();
             // redirect to admin rooms page
             navigateTo('/hostel/view-rooms');
           })
          .catch((err) => {
             console.log(err);
             // toast message
             toast.error('Failed to add room');
           });
       } catch (error) {
        console.log(error);
       }
    }
    const [showPayment, setShowPayment]=useState(false)
  return (
    <div className=''>
       <div className="p-5 border-b-2 ">
       <h1 className='text-2xl font-bold text-center'>Add Room</h1>
        <p className='text-gray-400 text-sm text-center' >Add a new room to your hostel.</p>
       
       </div>
        {/* Add room form */}
            <h1 className='text-2xl font-bold text-center'>Add Room Form</h1>
       <form onSubmit={handleSubmit}> <div className='flex justify-center p-5 '>
        <div className=" border grid grid-cols-1 gap-5 p-5 rounded w-[600px] bg-amber-50">
        { !showPayment? <div>
            <div className="">
                <label htmlFor="roomNumber" className='w-full p-5'>Room Number</label>
                <input type="text" placeholder='Enter room number' className='w-full h-14 p-3 pt-2 rounded-lg border' onChange={handleFormDataChange} name='Room_Number'/>
            </div>
            <div className="">
                <label htmlFor="noOfBed" className='w-full p-5'>Number of Beds</label>
                <input type="number" placeholder='Number of Beds' className='w-full h-14 p-3 pt-2 rounded-lg border' onChange={handleFormDataChange} name='Number_of_Beds' />
            </div>
            <div className="">
                <label htmlFor="typeOfRoom" className='w-full p-5'>Type of Room</label>
                <input type="text" placeholder='Type of Room' className='w-full h-14 p-3 pt-2 rounded-lg border' onChange={handleFormDataChange} name='Type_of_Room'/>
            </div>
            <div className="">
                <label htmlFor="Rent" className='w-full p-5'>Rent</label>
                <input type="number" placeholder='Rent per month' className='w-full h-14 p-3 pt-2 rounded-lg border' onChange={handleFormDataChange} name='Rent' />
            </div>
            <div className="">
                <label htmlFor="Photos" className='w-full p-5'>Photos</label>
                <input type="file" title='upload room Photos' className='w-full h-14 p-3 pt-2 rounded-lg border' onChange={handleFileChange} multiple name='Room_Photos' />
            </div>
            <div className="">
                <label htmlFor="facilties" className='w-full p-5'>facilties</label>
                <textarea  placeholder='facilties' className='w-full  p-3 pt-2  rounded-lg border' name='facilties' onChange={handleFormDataChange}/>
            </div>
            <div className="flex justify-end">
                <button className='h-12 w-24 bg-amber-950 rounded-xl text-white' type='button' onClick={()=>setShowPayment(true)}>Next</button>
            </div>
           
          </div>: <div>
<div>
<div className="px-6 py-4">
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
        onChange={handleFormDataChange}
        id="card-number"
        name='cardNumber'
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
        name='expiryDate'
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
        onChange={handleFormDataChange}
        id="cvv" 
        type="text"
        name='cvv'
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
        placeholder="Full Name" name='cardHolderName'
      />
    </div>
    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
      Pay {formData.Number_of_Beds*1000} Rs
    </button>
  </div>
</div>
           
            </div>}
           
        </div></div></form>
    </div>
  )
}

export default AddRoom