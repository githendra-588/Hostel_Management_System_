import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select'
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";

const RegisterHostelForm = () => {
  const [hostelData, setHostelData] = useState({
    Owner_Name: "",
    Owner_Email: "",
    password:"",
    Owner_Phone: "",
    Hostel_Name: "",
    Address: "",
    Hostel_Location_Link: "",
    Description: "",
    Hostel_Photos: null,
    Room_Type: [],
    Number_of_Rooms: "",
    Room_Description: "",
    Room_Photos: null,
     Rental_Rates: "",
    In_Time: "",
    Out_Time: "",
    Payment_Methods: "",
    Deposit_requirements:"",
    Payment_Policies: "",
     Amenities: "",
    Rules_and_Policies: "",
    Latitude:"",
    Longitude:"",
    city: "",
    Document_Number:"",
    Document_Photo:null,
    Hostel_For:""
    // packageName: "",
    // packageDescription: "",
    // packagePrice: "",
    // packagePhotos: [],
   
    // availabilityCalendar: "",
   
    // feedbacks: [],
    // adminApproval: false,
    
  });
const navigateTo=useNavigate()
  const handleChange = (e) => {
    const { name, value,type, files } = e.target;

    // console.log(hostelData)

    if(name==="Hostel_Photos" || name==="Room_Photos"){
      //take all the files
      const files = Array.from(e.target.files);
      // console.log(files)
      // console.log(files);
      // Update the state with the new files
      setHostelData((prevState) => ({
       ...prevState,
        [name]: files
      }));
      return 
    }
    else if(name === 'Document_Photo'){
      // take the first file
      const file = e.target.files[0];
      // Update the state with the new file
      setHostelData((prevState) => ({
       ...prevState,
        Document_Photo: file
      }));
      return
    }
    else
 setHostelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // type==="file"&&setHostelData((prevState) => ({
    //   ...prevState,
    //   [name]: files
    // }))
 
   
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(hostelData);
    // Example: send data to API, database, etc.
    const formData = new FormData();

    // Append each key-value pair from hostelData to formData
    Object.keys(hostelData).forEach((key) => {
      if (hostelData[key] !== null) {
        // If the value is a file (like Hostel_Photos or Room_Photos), append each file
        if (key === 'Hostel_Photos' || key === 'Room_Photos') {
          Array.from(hostelData[key]).forEach((file) => {
            formData.append(key, file);
          })

        } 
        else if(key === 'Document_Photo') {
          formData.append(key, hostelData.Document_Photo);
        }
        else {
          // Append other key-value pairs.Document_Photo
          formData.append(key, hostelData[key]);
        }
      }
    });
   try {
    const res= await AxiosInstance.post(`hostels/register`, formData)
    console.log(res);
    toast.success(res.data.message)
    // navigateTo('/login-hostel')
   } catch (error) {
    toast.error(error.response.data.error)
    console.log(error);
   }
  };
  const [location, setLocation] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  // Function to get user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude}, ${longitude}`);

          // Generate Google Maps link
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setGoogleMapsLink(mapsLink);
          setHostelData((prevState) => ({
            ...prevState,
            Hostel_Location_Link: mapsLink,
          }));
          setHostelData((prevState) => ({
            ...prevState,
            Latitude: latitude,
            Longitude: longitude,
          }));
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLocation('Unable to retrieve your location');
          setGoogleMapsLink('');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
      setGoogleMapsLink('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-amber-100 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
        Register Hostel
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Owner Profile */}
          <div className="col-span-2">
            <h3 className="font-bold text-green-700 p-3">Owner Details:</h3>
          </div>
          <div>
            <label
              htmlFor="ownerName"
              className="flex text-sm font-medium text-gray-700 w-full"
            >
              Owner Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="Owner_Name"
              value={hostelData.Owner_Name}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Owner Name"
            />
          </div>
          <div>
            <label
              htmlFor="ownerEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Owner Email
            </label>
            <input
              type="email"
              id="ownerEmail"
              name="Owner_Email"
              value={hostelData.Owner_Email}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2  shadow-lg"
              placeholder="Owner Email"
            />
          </div>
          <div>
            <label
              htmlFor="ownerPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Owner Phone
            </label>
            <input
              type="text"
              id="ownerPhone"
              name="Owner_Phone"
              value={hostelData.Owner_Phone}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Owner Phone"
            />
          </div>
          <div>
            <label
              htmlFor="ownerPhone"
              className="block text-sm font-medium text-gray-700"
            >
             Password
            </label>
            <input
              type="password"
              // id="ownerPhone"
              name="password"
              value={hostelData.password}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="******************"
            />
          </div>
          {/* Hostel Details */}
          <div className="col-span-2">
            <h3 className="font-bold text-green-700 p-3">Hostel Details:</h3>
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-700"
            >
              Hostel Name
            </label>
            <input
              type="text"
              id="hostelName"
              name="Hostel_Name"
              value={hostelData.Hostel_Name}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Hostel Name"
            />
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-700"
            >
             City
            </label>
            <input
              type="text"
              id="City"
              name="city"
              value={hostelData.city}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="City"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              placeholder="Address"
              name="Address"
              value={hostelData.Address}
              onChange={handleChange}
              className=" h-20 w-full rounded-lg p-2"
              rows="3"
            ></textarea>
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="text"
              id="Latitude"
              name="Latitude"
              value={hostelData.Latitude}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Latitude"
            />
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-700"
            >
             Longitude
            </label>
            <input
              type="text"
              id="Longitude"
              name="Longitude"
              value={hostelData.Longitude}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Longitude"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="hostelName"
              className="block text-sm font-medium text-gray-700"
            >
              Hostel Location Link
            </label>
            <input
              type="text"
              id="hostelName"
              name="Hostel_Location_Link"
              // defaultValue={`https://www.google.com/maps?q=${hostelData.Latitude},${hostelData.Longitude}`}
              defaultValue={hostelData.Hostel_Location_Link ||`https://www.google.com/maps?q=${hostelData.Latitude},${hostelData.Longitude}`}
              onChange={()=> setHostelData((prevState) => ({
                ...prevState,
                Hostel_Location_Link: `https://www.google.com/maps?q=${hostelData.Latitude},${hostelData.Longitude}`,
              }))}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Hostel Location  "
            />
            <button className="bi bi-eye relative bottom-7 left-[45rem]  -translate-y-1/2 cursor-pointer z-20 opacity-100 bg-green-500 h-8 text-white  rounded" type="button" onClick={getLocation}>Get current location </button>
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="Description"
              placeholder="brief overview of facilities, amenities"
              value={hostelData.Description}
              onChange={handleChange}
              className="rounded-lg p-2 h-32 w-full"
              rows="3"
            ></textarea>
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="photos"
              className="block text-sm font-medium text-gray-700"
            >
             Hostel Photos
            </label>
            <input
              type="file"
              id="photos"
              title="upload hostel photos"
              name="Hostel_Photos"
              onChange={handleChange}
              className="input"
              multiple
            />
          </div>
          <div className="space-y-2 col-span-1">
            <label
              htmlFor="Hostel_For"
              className="block text-sm font-medium text-gray-700"
            >
             Hostel For
            </label>
            <select
            className="w-full h-10 rounded-lg p-2 shadow-lg"
            id="Hostel_For"
            onChange={handleChange}
            name='Hostel_For'
          >
            <option value="">--Select--</option>
            <option value="male">mens</option>
            <option value="female">Womens</option>
            <option value="other">Other</option>
          </select>
          </div>
        
          <div>
            <label
              htmlFor="ownerPhone"
              className="block text-sm font-medium text-gray-700"
            >
             Document Photo 
            </label>
            <input
              type="file"
              title=" Upload valid photo, Admin will require for verification otherwise admin will reject your registration"
              // id="ownerPhone"
            name="Document_Photo"
              // value={hostelData.ownerPhone}
            onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="******************"
            />
            <p className="text-sm text-gray-400">Upload valid photo, Admin will require for verification otherwise admin will reject your registration</p>
          </div>
            <div>
            <label
              htmlFor="ownerPhone"
              className="block text-sm font-medium text-gray-700"
            >
             Document Number
            </label>
            <input
              type="text"
              // id="ownerPhone"
              name="Document_Number"
              value={hostelData.Document_Number}
               onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="e.g GST Number, License Number, Registration Number"
            />
          </div>
          <div className="col-span-2">
            <h3 className="font-bold text-green-700 p-3">Room Details:</h3>
          </div>
          
          {/* Room Details */}
          <div>
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700"
            >
              Room Type
            </label>
            {/* <Select
      closeMenuOnSelect={false}
      // components={animatedComponents}
      // defaultValue={[colourOptions[4], colourOptions[5]]}
      isMulti
      options={[{label:"1 Sharing", value:"1 Sharing"},{label:"2 Sharing", value:"2 Sharing"},{label:"3 Sharing", value:"3 Sharing"},{label:"4 Sharing", value:"4 Sharing"},{label:"5 Sharing", value:"5 Sharing"},{label:"6 Sharing", value:"6 Sharing"},{label:"7 Sharing", value:"7 Sharing"},{label:"others", value:"others"}]}
    /> */}
            <select
             
              id="roomType"
              //  value={hostelData.Room_Type}
              name="Room_Type"
              onChange={handleChange}
              className="w-full h-15 rounded-lg p-2"
              placeholder=""
              multiple
            >
              <option value="">Select Room Types</option>
              <option value="1 Sharing">1 Sharing</option>
              <option value="2 Sharing">2 Sharing</option>
              <option value="3 Sharing">3 Sharing</option>
              <option value="4 Sharing">4 Sharing</option>
              <option value="5 Sharing">5 Sharing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="numberOfRooms"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Rooms
            </label>
            <input
              type="number"
              id="numberOfRooms"
              name="Number_of_Rooms"
              value={hostelData.Number_of_Rooms}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Number of Rooms"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="roomDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Room Description
            </label>
            <textarea
              id="roomDescription"
              name="Room_Description"
              value={hostelData.Room_Description}
              onChange={handleChange}
              className="input h-20 w-full rounded-lg p-3"
              rows="3"
              placeholder=" Room Description (e.g., bed size, amenities)"
            ></textarea>
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="roomPhotos"
              className="block text-sm font-medium text-gray-700"
            >
              Room Photos
            </label>
            <input
              type="file"
              id="roomPhotos"
              name="Room_Photos"
              onChange={handleChange}
              className="input"
              multiple
            />
          </div>

          {/* Food Packages */}
          <div className="col-span-2">
            <h3 className="font-bold text-green-700 p-5">Rules & Policies:</h3>
          </div>

          {/* Rental Information */}
          <div className="grid grid-cols-4 gap-1 col-span-2">
          <div className="col-span-2">
            <label
              htmlFor="rentalRates"
              className="block text-sm font-medium text-gray-700"
            >
              Rental Rates 
            </label>
            <input
              type="text"
              id="rentalRates"
              name="Rental_Rates"
              value={hostelData.Rental_Rates}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder=" Rental Rates (starting price)"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="checkInTime"
              className="block text-sm font-medium text-gray-700"
            >
             In Time
            </label>
            <input
              type="time"
              id="checkInTime"
              name="In_Time"
              value={hostelData.In_Time}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder=""
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="checkOutTime"
              className="block text-sm font-medium text-gray-700"
            >
           Out Time
            </label>
            <input
              type="time"
              id="checkOutTime"
              name="Out_Time"
              value={hostelData.Out_Time}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder=""
            />
          </div>
</div>
          {/* Payment Details */}
          <div>
            <label
              htmlFor="paymentMethods"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Methods
            </label>
            <input
              type="text"
              id="paymentMethods"
              name="Payment_Methods"
              value={hostelData.Payment_Methods}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder=" Payment Methods(credit card,debit card,UPI) "
            />
          </div>
          <div>
            <label
              htmlFor="Deposit_requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Deposit requirements
            </label>
            <input
              type="text"
              id="Deposit_requirements"
              name="Deposit_requirements"
              value={hostelData.Deposit_requirements}
              onChange={handleChange}
              className="w-full h-10 rounded-lg p-2 shadow-lg"
              placeholder="Deposit requirements(e.g advance payments) "
            />
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="Payment_Policies"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Policies
            </label>
            <textarea
              id="Payment_Policies"
              name="Payment_Policies"
              value={hostelData.Payment_Policies}
              onChange={handleChange}
              className="input h-20 w-full p-3"
              rows="3"
              placeholder="Payment Policies(e.g. cash on arrival, no deposit required,no amount refund etc) "
            ></textarea>
          </div>
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="paymentPolicies"
              className="block text-sm font-medium text-gray-700"
            >
              Rules and Policies
            </label>
            <textarea
              id="Rules_and_Policies"
              name="Rules_and_Policies"
              value={hostelData.Rules_and_Policies}
              onChange={handleChange}
              className="input h-20 w-full p-3"
              rows="3"
              placeholder="Rules and Policies(smoking policy, pet policy, time policy, friends& relatives policy"
            ></textarea>
          </div>
         
          {/* Amenities */}
          <div className="space-y-2 col-span-2">
            <label
              htmlFor="amenities"
              className="block text-sm font-medium text-gray-700"
            >
              Amenities
            </label>
            <textarea
              id="amenities"
              name="Amenities"
              value={hostelData.Amenities}
              onChange={handleChange}
              className="p-3 h-20 w-full"
              placeholder="Amenities (Wi-Fi, laundry, parking, etc.)"
              rows="3"
            ></textarea>
          </div>

         
         
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
      <span className='ml-3'>Already Registered?</span>   <Link className="text-blue-600 hover:text-gray-800 mb-6 " to="/login-hostel">
            click here
          </Link>
    </div>
  );
};

export default RegisterHostelForm;
