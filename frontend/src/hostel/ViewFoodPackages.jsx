import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const ViewFoodPackages = () => {
const hostel=JSON.parse(sessionStorage.getItem('hostel'));
const [packageData,setPackageData] =useState()
  // get Food packages
  const getFoodPackages =async() => {
    // fetch food packages with AxiosInstance
   try {
    const response = await AxiosInstance.get(`hostels/food/${hostel._id}`);
    console.log(response.data);
    setPackageData(response.data.data);
   } catch (error) {
    console.log(error);
   }
  }
useEffect(()=>{
  getFoodPackages();
}, [])
  return (
    <div>
      <div className="border-b-2 flex">
        <h3 className="p-5 text-2xl font-bold ">Food Packages</h3>
        <Link className="mx-auto me-3 mt-3" to={'/hostel/add-food-package'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#5f6368"
          >
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </Link>
      </div>
      <div className="p-6 overflow-scroll px-0">
  <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead className=''>
      <tr>
        <th className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Package Name
          
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
           Description
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
          Meal Timings
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Package Price
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Type of Meal
           
          </p>
        </th>
       
      </tr>
    </thead>
    <tbody>
     {packageData&&packageData.map((item)=> <tr>
        <td className="p-4 border-b border-blue-gray-50">
          {item.Package_Name}
        </td>
        <td className="p-4 border-b border-blue-gray-50">
        {item.Description}
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          
          {item.Meal_Timings}
        </td>
        <td className="p-4 border-b border-blue-gray-50">
         {item.Package_Price} Rs.
        </td>
        <td className="p-4 border-b border-blue-gray-50">
         {item.Type_of_Meal}
        </td>
       
      </tr>)}
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default ViewFoodPackages;
