import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 onClick = {()=> {
            props.setLookingForDriverPanel(false)}} className=' text-center w-[93%] absolute  top-0'>
                <i className=" text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl mt-3 font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex flex-col items-center justify-center gap-2 '>
                <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png" alt=" border-b-1no image" className="h-30 w-50" />
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
            </div>

        </div>
    )
}

export default LookingForDriver
