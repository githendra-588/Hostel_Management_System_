import React from 'react'
import Slider from 'react-slick'
import { url } from '../AxiosInstance'

const ViewSingleHostel = ({item,acceptReject}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* You can open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> <dialog id="my_modal_3" className="modal p-10 w-full rounded-lg">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 rounded-full w-10 border border-red-500 text-red-500">✕</button>
    </form>
    
  </div>
</dialog>*/}

<div className="border rounded-lg ">
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
                  className="w-full my-4 h-96"
src={`${url}uploads/Hostel/Profiles/${pic}`}
                  // src="https://franchisehub.ca/wp-content/uploads/2024/01/REV-Zero-Royalty.jpg"
                  alt="Sunset in the mountains"
                />
              </div>)}
              {/* <div>
                <img
                  className="w-full my-4"
                  src="https://franchisehub.ca/wp-content/uploads/2024/01/REV-Zero-Royalty.jpg"
                  alt="Sunset in the mountains"
                />
              </div> */}
            </Slider>
          </div>
          <p className="mt-8">
            {/* <button
              onClick={() => {
                navigateTo("/contacts");
              }}
              className="rounded-full bg-gray-900 px-8 py-2 h-12 text-sm font-semibold text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
              Verify
            </button> */}
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
                {/* <tr>
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
                </tr> */}
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
                          {/* <p>{item.description}</p>
                          <p>Price : {item.price}Rs </p> */}
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
    </div>
  </div>
  )
}

export default ViewSingleHostel