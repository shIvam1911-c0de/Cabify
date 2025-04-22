import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { SocketContext } from "../Context/SocketContext";
import LiveTracking from '../Components/LiveTracking';

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {};
    const {socket} = useContext(SocketContext);
    const navigate = useNavigate();

    socket.on("ride-ended", ()=>{
        navigate("/home");
    })

    return (
        <div className='h-screen'>
            <Link to="/home" className='fixed right-2 top-2 h-10 w-10  bg-white  flex items-center justify-center rounded-full'>
            <i className=" text-lg font-md ri-home-fill"></i>
            </Link>
            <div className='h-1/2'>
               <LiveTracking/>
            </div>

            <div className="h-1/2 p-4">
                <div className='flex  items-center justify-between mb-4 '>
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png" alt=" no image" className="h-20" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullName.firstName}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>{ride?.vehicle?.model || "Maruti Suzuki Alto"}</p>
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center gap-2 mb-4'>
                    <div className='w-full  flex flex-col gap-4'>
                        
                        <div className='flex items-center gap-5 border-b-2 border-b-gray-400'>
                            <i className="text-2xl ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='font-semibold text-lg'>{ride?.pickup}</h3>
                                <p className='text-base text-gray-600 -mt-1 mb-3'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 -mt-2 '>
                            <i className=" text-2xl ri-currency-fill"></i>
                            <div>
                                <h3 className='font-semibold text-lg'>₹{ride?.fare}</h3>
                                <p className='text-base text-gray-600 -mt-1'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button  className='bg-blue-500 font-semibold text-white px-4 py-2 mt-4 rounded-lg w-full'>Make A Payment</button>
            </div>

        </div>
    )
}

export default Riding
