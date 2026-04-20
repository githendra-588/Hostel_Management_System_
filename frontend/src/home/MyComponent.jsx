import React, { useContext, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import axios from 'axios';
import AxiosInstance from '../AxiosInstance';
import { useNavigate } from 'react-router-dom';
// import { WordContext } from './WordContext';

const containerStyle = {
  width: '1400px',
  height: '600px',
  margin: 'auto',
};

const defaultCenter = {
  lat: 13.6288,
  lng: 79.4192,
};

const MyComponent = ({ word }) => {
  const navigateTo= useNavigate()
//   const {words}=useContext(WordContext);
  const [words, setWords]=useState() 
 // console.log(word, 'searching');
  const [mapCenter, setMapCenter] = useState({
    lat: 13.6288,
    lng: 79.4192,
  });
  const [mapZoom, setMapZoom] = useState(10);
  const [locationData, setLocationData] = useState([]);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU', // Replace with your API key
  });

  const [map, setMap] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [directions, setDirections] = useState(null);

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const onMarkerClick = (shop) => {
    setSelectedShop(shop);
    calculateDirections(position, { lat: parseFloat(shop.Latitude), lng: parseFloat(shop.longitude) });
  };

  const calculateDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  const [searchData, setSearchData] = useState([]);

  const searchFunction = async (data) => {
    // console.log(data, 'check word is came here or not');
    try {
      let endpoint = 'users/hostels';
if (data) {
  endpoint += `?city=${data}`;
}
      // const response = await AxiosInstance.get(`users/hostels?city=${data}`);
      const response = await AxiosInstance.get(endpoint);
      console.log(response.data.data, "check word is came here or not");
     // console.log(res.data.location);
      setSearchData(response.data.data || []);
    } catch (error) {
      console.log(error, "search function error" );
      // toast.error('not found');
    }
  };
  console.log(searchData, 'Search data I am setting');

  const showLocations = async () => {
    try {
      const response = await AxiosInstance.get(`users/hostels`);
    console.log(response.data.data);
    setLocationData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error)
          );
        });

        console.log(locationData, 'All Location data ');
        const { latitude, longitude } = position;
        console.log(`Current location: ${latitude}, ${longitude}`);
        setPosition({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error(`Error getting location: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      fetchUserLocation();
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLoading(false);
    }
    showLocations();
  }, []);

  useEffect(() => {
    searchFunction(words);
  }, [word]);

  return isLoaded ? (
    <div>
      <div className='flex justify-center p-10 rounded-lg border m-10 border-green-400'>
        <input
          type="search"
          className='h-10 w-full p-5 border rounded'
          value={word}
          onChange={(e) => setWords(e.target.value)}
          placeholder="Search for a hostel..."
        />
        <button onClick={() => searchFunction(words)} className='w-24 rounded bg-green-600 ml-3'>Search</button>
      </div>
      {loading ? (
        <div>Loading map...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position || defaultCenter}
          zoom={8}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {map && <Marker position={position} />}
          {searchData &&  Array.isArray(searchData) ?
            searchData.map((shop) => (
              <Marker
                key={shop._id}
                position={{ lat: parseFloat(shop.Latitude), lng: parseFloat(shop.Longitude) }}
                onClick={() => onMarkerClick(shop)}
                icon={{
                  url: '/loc2.png',
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
              
            )
            )  : (
              <Marker
                key={searchData.id}
                position={{ lat: parseFloat(searchData.Latitude), lng: parseFloat(searchData.Longitude) }}
                onClick={() => onMarkerClick(searchData)}
                icon={{
                  url: '/loc2.png',
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />)}
          {locationData.map((shop) => (
            <Marker
              key={shop.id}
                position={{ lat: parseFloat(shop.Latitude), lng: parseFloat(shop.Longitude) }}
                // position={{ lat: shop.Latitude, lng: shop.longitude }}
              onClick={() => onMarkerClick(shop)}
              icon={{
                url: '/loc2.png',
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
          {selectedShop && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedShop.Latitude),
                lng: parseFloat(selectedShop.Longitude),
              }}
              onCloseClick={() => setSelectedShop(null)}
            >
              <div>
                <h2 className='text-xl font-bold '>{selectedShop.Hostel_Name}</h2>
                <p>
                  <b>Address:</b>
                  {selectedShop.city}, 
                  {selectedShop.Address}
                </p>
                <p>
                  <b>Rental Rates(Starting Price): </b>
                  {selectedShop.Rental_Rates} Rs.
                </p>
                <p>
                  <b>Contact:</b>
                  {selectedShop.Owner_Phone}
                </p>
                <p>
                  <b>Amenities:</b>
                  {
                    // truncate text to 
                    selectedShop.Amenities.length > 100
                     ? `${selectedShop.Amenities.slice(0, 100)}...`
                      : selectedShop.Amenities
                  }
                  {/* {
                    selectedShop.Amenities
                  } */}
                </p>
                {directions && directions.routes && directions.routes[0] && (
        <p className='text-danger'>
          <b>Distance:</b> {directions.routes[0].legs[0].distance.text}
        </p>
       
      )} <button className='bg-green-600 text-white h-7 m-2 w-20 rounded' onClick={
        ()=>{
          navigateTo(`/user/view/${selectedShop._id}`, {state:selectedShop})
        }
      }>View</button>
              </div>
            </InfoWindow>
          )}
         {directions && (
    <DirectionsRenderer
      directions={directions}
      options={{
        polylineOptions: {
          strokeColor: 'green', // Change the color of the route
          strokeWeight: 12,
        },
        markerOptions: {
          icon: {
            url: './truck.png', // Change the icon for the markers on the route
            scaledSize: new window.google.maps.Size(50, 50),
          },
        },
      }}
    />
  )}
        </GoogleMap>
      )}
    </div>
  ) : (
    <div>Loading map... <img src="/process1.gif" alt="" /></div>
  );
};

export default React.memo(MyComponent);
