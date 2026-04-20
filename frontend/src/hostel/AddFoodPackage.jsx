import React from 'react'
import { toast } from 'react-toastify';
import AxiosInstance from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';

const AddFoodPackage = () => {
    const hostel= JSON.parse(sessionStorage.getItem('hostel'))
    const navigateTo = useNavigate();
    // handlesubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // get form data
        const formData = new FormData(e.target);
        const formProps=Object.fromEntries(formData)
        console.log(formProps);
      
        try {
            const response = await AxiosInstance.post(`/hostels/food/${hostel._id}`, formProps); 
            console.log(response);
            toast.success('Food package added successfully!');
            navigateTo('/hostel/food-package');
        } catch (error) {
            console.log(error);
            toast.error('Failed to add food package. Please try again.');
        }
    }
  return (
    <div className=''>
       <div className="p-5 border-b-2 ">
       <h1 className='text-2xl font-bold text-center'>Add Food Package</h1>
        <p className='text-gray-400 text-sm text-center' >Add a Food Package to your hostel.</p>
       
       </div>
        {/* Add Food Package form */}
            <h1 className='text-2xl font-bold text-center'>Add Food Package Form</h1>
       <form onSubmit={handleSubmit}> <div className='flex justify-center p-5 '>
        <div className=" border grid grid-cols-1 gap-5 p-5 rounded w-[600px] bg-amber-50">
            <div className="">
                <label htmlFor="PackageName" className='w-full p-5'>Package Name</label>
                <input type="text" placeholder='Enter Package Name e.g Full Day Mess/Half day mess' name='Package_Name' className='w-full h-14 p-3 pt-2 rounded-lg border'/>
            </div>
            <div className="">
                <label htmlFor="Price" className='w-full p-5'>Package Price</label>
                <input type="text" placeholder='Price' className='w-full h-14 p-3 pt-2 rounded-lg border' name='Package_Price' />
            </div>
            <div className="">
                <label htmlFor="typeOfRoom" className='w-full p-5'>Type of Meal</label>
                <input type="text" placeholder='Veg/Non-veg' className='w-full h-14 p-3 pt-2 rounded-lg border' name='Type_of_Meal' />
            </div>
            <div className="">
                <label htmlFor="Rent" className='w-full p-5'>Meal Timings</label>
                <select   className='w-full h-14 p-3 pt-2 rounded-lg border' name='Meal_Timings' >
                    <option value=""> Select timings</option>
                    <option value="Breakfast + Lunch + Dinner">Breakfast + Lunch + Dinner</option>
                    <option value="Lunch + Dinner">Lunch + Dinner</option>
                    <option value="Breakfast + Lunch ">Breakfast + Lunch </option>
                    <option value="Only Lunch"> Only Lunch </option>
                    <option value="Only Dinner">Only Dinner</option>
                </select>
            </div>
            {/* <div className="">
                <label htmlFor="Photos" className='w-full p-5'>Photos</label>
                <input type="file" title='upload Food Photos' className='w-full h-14 p-3 pt-2 rounded-lg border' />
            </div> */}
            <div className="">
                <label htmlFor="Description" className='w-full p-5'>Description</label>
                <textarea  placeholder='Description about food like meat once/twice in week/month' name='Description' className='w-full  p-3 pt-2  rounded-lg border'/>
            </div>
            <div className="flex justify-center">
                <button className='h-12 w-24 bg-amber-950 rounded-xl text-white' type='submit'>Submit</button>
            </div>
        </div></div></form>
    </div>
  )
}

export default AddFoodPackage