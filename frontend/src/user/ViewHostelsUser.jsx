import React, { useEffect } from 'react'
import MyComponent from '../home/MyComponent'
import AxiosInstance from '../AxiosInstance'
// import MapComponent from '../home/MapComponent'

const ViewHostelsUser = () => {
  // get hostels from backend
  const getHostels = async() => {
    try {
      const response = await AxiosInstance.get(`users/hostels`);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(()=> {
  getHostels()
},[])


  return (
    <div>
        <div></div>
        <div><MyComponent/></div>
        <div></div>
    </div>
  )
}

export default ViewHostelsUser