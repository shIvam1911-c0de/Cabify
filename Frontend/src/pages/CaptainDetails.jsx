import React , {useContext} from 'react'
import {CaptainDataContext} from "../Context/CaptainContext";

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);
  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3 '>
            <img className='h-10 w-10 rounded-full object-cover ' src="https://tse3.mm.bing.net/th?id=OIP.YQGwtpOGecZajkbh2HMMGAHaHa&pid=Api&P=0&h=180" alt="No Driver" />
            <h4 className='text-lg  font-medium  capitalize'>{captain.fullName.firstName + " " + captain.fullName.lastName}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹295.30</h4>
            <p className='text-sm  text-gray-600 ml-3 '>Earned</p>
          </div>
        </div>
        <div className='flex  p-2 bg-gray-200 rounded-lg justify-center gap-5 items-start mt-5'>
          <div className='text-center'>
            <i className=" text-2xl mb-2 font-thin ri-time-line"></i>
            <h5 className="text-lg  font-medium ">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online </p>
          </div>
          <div className='text-center'>
            <i className=" text-2xl mb-2 font-thin ri-speed-up-line"></i>
            <h5 className="text-lg  font-medium ">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online </p>
          </div>
          <div className='text-center'>
            <i className=" text-2xl mb-2 font-thin ri-booklet-line"></i>
            <h5 className="text-lg  font-medium ">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online </p>
          </div>

        </div>
      
    </div>
  )
}

export default CaptainDetails
