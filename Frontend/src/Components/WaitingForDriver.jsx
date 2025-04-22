import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
            <h5 onClick = {()=> {
            props.waitingForDriverPanel(false)}} className=' text-center w-[93%] absolute  top-0'>
                <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>

            <div className='flex  items-center justify-between '>
                <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png" alt=" border-b-1no image" className="h-12"/>
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullName.firstName}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>

                </div>
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
            </div>

        </div>
  )
}

export default WaitingForDriver
