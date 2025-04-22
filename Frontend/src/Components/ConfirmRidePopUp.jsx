import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {

    const [otp , setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();
        // console.log('OTP Submitted')

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params:{
                    rideId: props.ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
        });

        if(response.status === 200){
            props.setConfirmRidePopUpPanel(false);
            navigate('/captain-riding',{state:{ride: props.ride}} );
        }
    }
    return (
        <div>
            <h5 onClick={() => {
                props.setConfirmRidePopUpPanel(false)
            }} className=' text-center w-[93%] absolute  top-0'>
                <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl  font-semibold mb-3'>Confirm Your Ride</h3>

            <div className='flex items-center justify-between mb-3 p-1 '>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 w-12  object-cover rounded-full' src="https://tse1.mm.bing.net/th?id=OIP.6DBd_iqtj1Mj9W13u3bccwHaKf&pid=Api&P=0&h=180" alt="No Image" />
                    <h2 className='text-xl font-medium capitalize'>{props.ride?.user.fullName.firstName}</h2>
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

                <div className='mt-10  w-full p-4'>
                    <form onSubmit= {submitHandler}>
                        <input value={otp} onChange={(e)=> setOtp(e.target.value)} type="text" placeholder='Enter OTP' className='bg-gray-300 px-6 py-2 text-lg font-mono rounded-lg w-full mt-3' />

                        <button   className='bg-blue-500 mt-5 flex justify-center font-semibold text-white  p-2  rounded-lg  w-full'>Confirm</button>

                        <button onClick={() => {
                             props.setConfirmRidePopUpPanel(false)
                             props.setConfirmRidePopUpPanel(false);
                        }}
                            className='bg-red-400 mt-3 font-semibold text-white  p-2  rounded-lg w-full '>Cancel </button>


                        
                    </form>

                </div>
            </div>

        </div>
    )
}

export default ConfirmRidePopUp
