import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import FinishRide from '../Components/FinishRide';
import LiveTracking from '../Components/LiveTracking';

const CaptainRiding = () => {

  const location = useLocation();
  const rideData = location.state?.ride;

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    useGSAP(function(){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current, {
            transform:'translateY(0)',
          });
        }
        else{
          gsap.to(finishRidePanelRef.current, {
            transform:'translateY(100%)',
          });
        }
    
      },[finishRidePanel]);

      

  return (
    <div className='h-screen relative flex flex-col justify-end'>
        
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen '>
        <img
          className="w-16  "
          src="https://tse3.mm.bing.net/th?id=OIP.9UnwWZb1MMVd0efmk4vVowHaCL&pid=Api&P=0&h=180"

        />
        <Link to="/captain-home" className='fixed right-2 top-2 h-10 w-10  bg-gray-300  flex items-center justify-center rounded-full'>
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>


      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400' onClick={()=>{
        setFinishRidePanel(true);
      }}>

        <h5 className=' text-center w-[95%] absolute  top-0'>
            <i className=" text-3xl text-gray-500 ri-arrow-up-wide-line"></i>
        </h5>
        <h1 className='text-xl font-semibold'>4 KM AWAY</h1>

        <button className='bg-green-600 font-semibold text-white px-10 p-3 rounded-lg '>Compelete Ride</button>
      </div>
      <div  ref = {finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white  px-3 pt-12  py-6'>
        <FinishRide ride = {rideData}  setFinishRidePanel={setFinishRidePanel} />
      </div>

      
      <div className='h-screen fixed w-screen top-0 z-[-1]'>
        <LiveTracking/>
      </div>

    </div>
  )
}

export default CaptainRiding
