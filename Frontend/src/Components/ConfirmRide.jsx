import React from 'react'
import 'remixicon/fonts/remixicon.css';


const ConfirmRide = (props) => {
  return (
    <div>
        <h5 onClick = {()=> {
            props.setConfirmRidePanel(false)}} className=' text-center w-[93%] absolute  top-0'>
          <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl mt-3 font-semibold mb-5'>Confirm Your Ride</h3>

        <div className='flex flex-col items-center justify-center gap-2 '>
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png" alt=" border-b-1no image" className="h-30 w-50"/>
            <div className='w-full  flex flex-col gap-4'>
                <div className='flex items-center gap-5 border-b-2 border-b-gray-400'>
                    <i className=" text-2xl ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='font-semibold text-lg'>562/11-A</h3>
                        <p className='text-base text-gray-600 -mt-1'>{props?.pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 border-b-2 border-b-gray-400'>
                    <i className=" text-2xl ri-map-pin-range-fill"></i>
                    <div>
                        <h3 className='font-semibold text-lg'>566/12-A</h3>
                        <p className='text-base text-gray-600 -mt-1'>{props?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-'>
                    <i className=" text-2xl ri-currency-fill"></i>                    
                    <div>
                        <h3 className='font-semibold text-lg'>₹{props.fare?.[props.vehicleType]}</h3>
                        <p className='text-base text-gray-600 -mt-1'>Cash</p>
                    </div>
                </div>
            </div>
            <button onClick = {()=> {
            props.setLookingForDriverPanel(true)
            props.setConfirmRidePanel(false)
            props.createRide()}} className='bg-blue-500 font-semibold text-white px-4 py-2 mt-4 rounded-lg w-full'>Confirm Ride </button>
        </div>
      
    </div>
  )
}

export default ConfirmRide
