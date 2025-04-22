import React from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {

    const navigate = useNavigate();

    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if(response.status === 200){
            navigate('/captain-home');
        }
    }
  return (
    <div>
    <h5 onClick={() => {
        props.setFinishRidePanel(false)
    }} className=' text-center w-[93%] absolute  top-0'>
        <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
    </h5>
    <h3 className='text-2xl  font-semibold mb-3'>Finish Ride </h3>

    <div className='flex items-center justify-between mb-3 p-1 '>
        <div className='flex items-center gap-3 '>
            <img className='h-12 w-12  object-cover rounded-full' src="https://tse1.mm.bing.net/th?id=OIP.6DBd_iqtj1Mj9W13u3bccwHaKf&pid=Api&P=0&h=180" alt="No Image" />
            <h2 className='text-xl fnt-medium'>{props.ride?.user.fullName.firstName}</h2>
        </div>
        <h2 className='text-lg font-semibold'>2.2 KM</h2>
    </div>

    <div className='flex flex-col items-center justify-center gap-2 '>
        <div className='w-full  flex flex-col gap-4'>
            <div className='flex items-center gap-5 border-b-2 border-b-gray-400'>
                <i className=" text-2xl ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='font-semibold text-lg'>562/11-A</h3>
                    <p className='text-base text-gray-600 -mt-1'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 border-b-2 border-b-gray-400'>
                <i className=" text-2xl ri-map-pin-range-fill"></i>
                <div>
                    <h3 className='font-semibold text-lg'>566/12-A</h3>
                    <p className='text-base text-gray-600 -mt-1'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-'>
                <i className=" text-2xl ri-currency-fill"></i>
                <div>
                    <h3 className='font-semibold text-lg'>₹ {props.ride?.fare}</h3>
                    <p className='text-base text-gray-600 -mt-1'>Cash</p>
                </div>
            </div>
        </div>

        <div className='mt-10 w-full p-4'>
        <button 
        onClick={endRide} className=' w-full bg-blue-500 mt-5 text-lg  flex justify-center font-semibold text-white   p-2  rounded-lg'>Finish Ride</button>

        <p className=' mt-7 text-xs'>Click on finish ride button if you have completed the payment</p>

        </div>
    </div>

</div>
  )
}

export default FinishRide
