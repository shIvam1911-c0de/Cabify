import React , {useState, useRef} from 'react'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom'
import CaptainDetails from './CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import { useEffect } from 'react';
import {SocketContext} from '../Context/SocketContext';
import { useContext } from 'react';
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
 

  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);

  useEffect(()=>{
    // console.log(captain);

    socket.emit("join", {
      userType:"captain",
      userId: captain._id
    })

    // this will  used for the to get the updated location of every 10 sec after  the captain is connected
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log({
          //   userId: captain._id,
          //   location:{
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }

          //   });
          socket.emit("update-location-captain", {
            userId: captain._id,
            location:{
              ltd: position.coords.latitude,
              lng: position.coords.longitude

            }
            
          });
        });
      }
    };



    // we use port for a live location because the navigator.geolocation is not working in the localhost

    // baad me isko uncomment krna hai
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();


  },[]);

  socket.on('new-ride', (data)=>{
    console.log("new ride", data);
    setRide(data);
    setRidePopUpPanel(true);
  })

  async function confirmRide(){

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    },

      {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true);
    
  }
  



  useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {
        transform:'translateY(0)',
      });
    }
    else{
      gsap.to(ridePopUpPanelRef.current, {
        transform:'translateY(100%)',
      });
    }

  },[ridePopUpPanel]);

  useGSAP(function(){
    if(confirmRidePopUpPanel){
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform:'translateY(0)',
      });
    }
    else{
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform:'translateY(100%)',
      });
    }

  },[confirmRidePopUpPanel]);


  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen '>
        <img
          className="w-15  "
          src="https://tse3.mm.bing.net/th?id=OIP.9UnwWZb1MMVd0efmk4vVowHaCL&pid=Api&P=0&h=180"

        />
        <Link to="/home" className='fixed right-2 top-2 h-10 w-10  bg-gray-300  flex items-center justify-center rounded-full'>
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://financialpanther.com/wp-content/uploads/Screen-Shot-2023-01-19-at-1.44.02-PM.png" alt="no image" />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails />

      </div>
      <div  ref = {ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white  px-3 pt-12  py-6'>
        <RidePopUp
         ride={ride}
         setRidePopUpPanel= {setRidePopUpPanel} setConfirmRidePopUpPanel= {setConfirmRidePopUpPanel}
         confirmRide = {confirmRide}
          />
      </div>

      <div  ref = {confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white  px-3 pt-12  py-6'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopUpPanel= {setConfirmRidePopUpPanel} setRidePopUpPanel= {setRidePopUpPanel} />
      </div>

    </div>
  )
}

export default CaptainHome 
