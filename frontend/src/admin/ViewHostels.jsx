import React, { useEffect, useState } from 'react'
import AxiosInstance, { url } from '../AxiosInstance'
import ViewSingleHostel from './ViewSingleHostel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { toast } from 'react-toastify';
import moment from 'moment';
const ViewHostels = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // fetch the hostels from the backend
  const [hostels, setHostels] = useState([])
  const getHostels =async()=> {
    try {
      const res= await AxiosInstance.get(`admin/hostels`);
      console.log(res);
      setHostels(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getHostels();
  }, [])
//  accept reject function for hostel
  const acceptReject = async (hostelId, status) => {
    try {
      const res = await AxiosInstance.put(
        `admin/hostels/${hostelId}`, {Hostel_Status: status}
       
        
      );
      console.log(res);
      toast.success(res.data.message);
      getHostels();
      document.getElementById('my_modal_3').close()
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const [item, setItem]=useState()
  return (
    <div>
    
         <div className="p-6 overflow-scroll px-0">
  <table className="mt-4 w-full min-w-max table-auto text-left">
    <thead className=''>
      <tr>
        <th className="cursor-pointer  border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
          Owner Details
          
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
          Hostel Details
           
          </p>
        </th>
        {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
          Room Details
           
          </p>
        </th> */}
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Status{" "}
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-xl font-bold text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Date of Registration
           
          </p>
        </th>
        <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2  leading-none opacity-70">
            Actions
          </p>
        </th>
      </tr>
    </thead>
    <tbody>
      {hostels&&hostels.map((item)=><tr key={item._id}>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 ">
                Name: {item.Owner_Name}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900  opacity-70">
                Email: {item.Owner_Email}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900  opacity-70">
                Phone: {item.Owner_Phone}
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
           src={`${url}uploads/Hostel/Profiles/${item.Hostel_Photos[0]}`}
              // src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
              alt="John Michael"
              className="inline-block relative object-cover object-center !rounded-full w-9 h-9 "
            />
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                {item.Hostel_Name}
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                Location: <a href={`${item.Hostel_Location_Link}`} target='_blank' className='text-blue-800 underline text-lg'>open</a>
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {item.city}, {item.Address}
              </p>
            </div>
          </div>
        </td>
        {/* <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Manager
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              Organization
            </p>
          </div>
        </td> */}
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <div
              className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
              style={{ opacity: 1 }}
            >
              <span className="">{item.Hostel_Status}</span>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {moment(item.Date_of_Registration).format('Do MMMM YYYY HH:mm')}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
            type="button"
            onClick={()=>{document.getElementById('my_modal_3').showModal()
          setItem(item)
          }}
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
        </td>
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}

  </tr>)}
  <dialog id="my_modal_3" className="modal p-10 w-full rounded-lg">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 rounded-full w-10 border border-red-500 text-red-500">✕</button>
    </form>
    <ViewSingleHostel item={item} acceptReject={acceptReject}/>
    {/* <h3 className="font-bold text-lg">Hello!</h3> */}
    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p>
    <p>
        
    </p> */}
    {/* <div className="border rounded-lg ">
<div className='p-3'>
<div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16 bg-white">
        {item&&<div className="mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
          <a
            href="#"
            className="max-w-3xl bg-white mx-auto text-xl sm:text-4xl font-semibold  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {item.Hostel_Name}
          </a>
          <div >
            <Slider  {...settings} >
             { item.Hostel_Photos.map((pic, index)=>
             <div className="" key={index}>
                <img
                  className="w-full my-4"
src={`${url}uploads/Hostel/Profiles/${pic}`}
                  // src="https://franchisehub.ca/wp-content/uploads/2024/01/REV-Zero-Royalty.jpg"
                  alt="Sunset in the mountains"
                />
              </div>)}
              <div>
                <img
                  className="w-full my-4"
                  src="https://franchisehub.ca/wp-content/uploads/2024/01/REV-Zero-Royalty.jpg"
                  alt="Sunset in the mountains"
                />
              </div>
            </Slider>
          </div>
          <p className="mt-8">
            <button
              onClick={() => {
                navigateTo("/contacts");
              }}
              className="rounded-full bg-gray-900 px-8 py-2 h-12 text-sm font-semibold text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
              Verify
            </button>
          </p>
          <div className="text-gray-700 text-base leading-8 max-w-2xl mx-auto">
            <table>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900  font-bold">
                      Owner Name:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Owner_Name}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                      Email:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.
Owner_Email}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Owner Phone
:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Owner_Phone
}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Hostel Name:
                    </div>
                  </td>
                  <td className="px-6 py-4 border underline text-purple-400">
                    <a href="#">{item.Hostel_Name}</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Address:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Address} {item.city}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Description
:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Description
}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                      Location:
                    </div>
                  </td>
                  <td className="px-6 py-4 border"><a href={`${item.Hostel_Location_Link}`} className='text-blue-700 underline' target='_blank'> View Location</a></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Room Types:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">
                    {item.Room_Type}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Room Description:
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Room_Description
}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Number of Rooms

                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Number_of_Rooms
}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                    Amenities
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.Amenities}</td>
                </tr>
               <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                      Total cost:{" "}
                    </div>
                  </td>
                  <td className="px-6 py-4 border">{item.totalCost}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 border">
                    <div className="text-lg text-gray-900 font-bold">
                      Franchise Details:{" "}
                    </div>
                  </td>
                  <td className="px-6 py-4 border">
                   {item.franchiseDetails}
                  </td>
                </tr> 
              </tbody>
            </table>
         
          
            <div>
              <h3 className="mt-10 p-5 text-lg font-bold text-purple-900">
                Rules & Policies
              </h3>
            </div>
            <div>
              <p>
              In Time: {item.In_Time}
              </p>
              <p>
                Out Time: {item.Out_Time}
              </p>
              <p>
                {item.Rules_and_Policies}
              </p>
              <h3 className="mt-10 p-5 text-lg font-bold text-purple-900">
              Payment_Policies
              </h3>
              <p>
              Payment Methods: {item.Payment_Methods
}
              </p>
              <p>
              Rental_Rates(Starting Price): {item.Rental_Rates} Rs.

              </p>
              <p>
              Deposit_requirements: {item.Deposit_Requirements} 
              </p>
              <p>
                {item.Payment_Policies}
              </p>
            </div>
            <h3 className="mt-10 p-5 text-lg font-bold text-purple-900">
                Room Photos
              </h3>
            <ul className="max-w-2xl mx-auto mt-20 divide-y  shadow shadow-blue-600 rounded-xl">
            {item.Room_Photos
 &&
                  item.Room_Photos.map((pic, index) => (
                    <li>
                      <details className="group">
                        <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                          <svg
                            className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            ></path>
                          </svg>
                          <span>Photo {index+1}</span>
                        </summary>
                        <article className="px-4 pb-4">
                          <img
                            src={`${url}uploads/Hostel/Profiles/${pic}`}
                            alt=""
                            className="w-96 h-48"
                          />
                      <p>{item.description}</p>
                          <p>Price : {item.price}Rs </p> 
                        </article>
                      </details>
                    </li>
                  ))}
            </ul>
            <h3 className="mt-10 p-5 text-lg font-bold text-purple-900">
             Verify
              </h3>
<div>
  <p>
    Document Number : {item.Document_Number}
  </p>
  <p>
    <a href={`${url}uploads/Hostel/Profiles/${item.Document_Photo}`} target='_blank' className='text-blue-700 underline'> View Document</a>
  </p>
</div>
          </div>
        
          <hr />
          <div className='flex justify-between p-5'>
            <button className='bg-green-500 h-12 w-24 rounded-lg ' type='button' onClick={()=>acceptReject(item._id, "Accepted")}>Accept</button>
            <button className='bg-red-500 h-12 w-24 rounded-lg ' type='button' onClick={()=>acceptReject(item._id, "Rejected")}>Reject</button>
          </div>
        </div>}
      </div>
</div>
    </div> */}

  </div>
</dialog>
      {/* <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Angular Project
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                Start date: 10 Dec 2023
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
              alt="Alexa Liras"
              className="inline-block relative object-cover object-center !rounded-full w-9 h-9 "
            />
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Alexa Liras
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                alexa@creative-tim.com
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Programator
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              Developer
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <div
              className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-purple-500/20 text-purple-600 py-1 px-2 text-xs rounded-md"
              style={{ opacity: 1 }}
            >
              <span className="">active</span>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            23/04/18
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
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
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Tailwind Project
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                Start date: 10 Dec 2023
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
              alt="Laurent Perrier"
              className="inline-block relative object-cover object-center !rounded-full w-9 h-9 "
            />
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Laurent Perrier
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                laurent@creative-tim.com
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Executive
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              Projects
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <div
              className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-yellow-500/20 text-yellow-600 py-1 px-2 text-xs rounded-md"
              style={{ opacity: 1 }}
            >
              <span className="">Scheduled</span>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            19/09/17
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
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
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Laravel Project
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                Start date: 10 Dec 2023
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
              alt="Michael Levi"
              className="inline-block relative object-cover object-center !rounded-full w-9 h-9 "
            />
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Michael Levi
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                michael@creative-tim.com
              </p>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Programator
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              Developer
            </p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <div
              className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
              style={{ opacity: 1 }}
            >
              <span className="">Completed</span>
            </div>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            24/12/08
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
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
        </td>
      </tr>
      <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Astro Project
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                Start date: 10 Dec 2023
              </p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
              alt="Richard Gran"
              className="inline-block relative object-cover object-center !rounded-full w-9 h-9 "
            />
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                Richard Gran
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                richard@creative-tim.com
              </p>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              Manager
            </p>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
              Executive
            </p>
          </div>
        </td>
        <td className="p-4">
          <div className="w-max">
            <div
              className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-red-500/20 text-red-700 py-1 px-2 text-xs rounded-md"
              style={{ opacity: 1 }}
            >
              <span className="">Pending</span>
            </div>
          </div>
        </td>
        <td className="p-4">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            04/10/21
          </p>
        </td>
        <td className="p-4">
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
        </td>
      </tr> */}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default ViewHostels