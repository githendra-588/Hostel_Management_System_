import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance, { url } from "../AxiosInstance";
import Slider from "react-slick";

const ViewRooms = () => {
  const hostel = JSON.parse(sessionStorage.getItem('hostel'));
  const [rooms, setRooms] = useState();
  const getRooms =async() => {
     try {
    const res= await AxiosInstance.get(`hostels/getroom/${hostel._id}`)
    console.log(res.data);
    setRooms(res.data.data);
  } catch (error) {
   console.log(error); 
  }}
 useEffect(()=>{
  getRooms();
 },[])
 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
  return (
    <div>
      <div className="border-b-2 flex">
        <h3 className="p-5 text-2xl font-bold ">Rooms</h3>
        <Link className="mx-auto me-3 mt-3" to={'/hostel/add-room'}>
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
      <div className=" grid grid-cols-3 p-3 gap-5">
       {rooms&&rooms.map((item)=> <div className="">
          <article className="group bg-amber-50">
          <Slider  {...settings} >
         {item.Room_Photos.map((pic)=> <div>
          <img
              alt=""
src={`${url}uploads/Hostel/Rooms/${pic}`}
              // src="/room2.png"
              className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
            />
          </div>)}
</Slider>
            <div className="p-4">
              <a href="#">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.Room_Number}
                </h3>
              </a>
<h3>
  {item.Type_of_Room
}
</h3>
<h3>Rent: {item.Rent} Rs</h3>
              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
               {item.facilties}
              </p>
            </div>
          </article>
        </div>)}
        {/* <div className="">
          <article className="group bg-amber-50">
            <img
              alt=""
              src="/room3.jpg"
              className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
            />

            <div className="p-4">
              <a href="#">
                <h3 className="text-lg font-medium text-gray-900">
                  Finding the Journey to Mordor
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae dolores, possimus pariatur animi temporibus nesciunt
                praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora
                nisi culpa eius atque dignissimos. Molestias explicabo corporis
                voluptatem?
              </p>
            </div>
          </article>
        </div>
        <div className="">
          <article className="group bg-amber-50">
            <img
              alt=""
              src="/room2.png"
              className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
            />

            <div className="p-4">
              <a href="#">
                <h3 className="text-lg font-medium text-gray-900">
                  Finding the Journey to Mordor
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Recusandae dolores, possimus pariatur animi temporibus nesciunt
                praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora
                nisi culpa eius atque dignissimos. Molestias explicabo corporis
                voluptatem?
              </p>
            </div>
          </article>
        </div> */}
      </div>
    </div>
  );
};

export default ViewRooms;
