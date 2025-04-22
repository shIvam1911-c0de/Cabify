import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick = {()=> props.setVehiclePanel(false)} className='text-center w-[93%] absolute  top-0'>
          <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl mt-3 font-semibold mb-5'>Choose a Vehicle</h3>

     
        <div onClick={()=> {
        props.setConfirmRidePanel(true)
        props.selectVehicle('car')
        }} className='flex border-2 border-gray-300 mb-3 active:border-black  w-full bg-gray-200 items-center justify-between rounded-xl pr-3 gap-1'>
        <img  className="h-12 " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"/>
        <div className='w-1/2 m-2'>
            <h4 className='font-medium text-lg'>CabifyGo<span><i className="ri-user-3-fill m-2"></i>4</span></h4>
            <h5 className='font-medium text-sm'>4 mins away</h5>
            <p className='text-xs font-normal text-gray-800'>Affordable , Compact rides</p>
        </div>
        <h2 className='text-xl font-semibold' >₹ {props.fare?.car}</h2>
        </div>

        <div onClick={()=> {
        props.setConfirmRidePanel(true)
        props.selectVehicle('auto')
        }}  className='flex border-2 border-gray-300 mb-3 active:border-black  w-full bg-gray-200 items-center justify-between rounded-xl pr-3 gap-1'>
        <img  className="h-12 w-18 " src="https://www.pngmart.com/files/23/Auto-PNG-Photo.png"/>
        <div className='w-1/2 gap-2'>
            <h4 className='font-medium text-md'>Auto<span><i className="ri-user-3-fill m-2"></i>3</span></h4>
            <h5 className='font-medium text-sm'>7 mins away</h5>
            <p className='text-xs font-normal text-gray-800'>Comfortable Rides</p>
        </div>
        <h2 className='text-xl font-semibold' >₹ {props.fare?.auto}</h2>
        </div>

        <div onClick={()=> {
        props.setConfirmRidePanel(true)
        props.selectVehicle('moto')
        }}  className='flex border-2  border-gray-300 mb-3 active:border-black  w-full bg-gray-200 items-center justify-between rounded-xl pr-3 gap-1'>
        <img  className="h-12 " src="https://www.pngmart.com/files/6/Motorcycle-PNG-Free-Download.png"/>
        <div className='w-1/2 -ml-1 gap-1'>
            <h4 className='font-medium text-lg'>MotoGo<span><i className="ri-user-3-fill m-2"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='text-xs font-normal text-gray-800'>Affordable Motorcycle Rides</p>
        </div>
        <h2 className='text-xl font-semibold' >₹ {props.fare?.moto}</h2>
        </div>

      
    </div>
  )
}

export default VehiclePanel
