import React from 'react'
import { Link } from 'react-router-dom'




const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-[url(C:\Users\Administrator\Desktop\placement\project\Uber\Frontend\src\assets\cabify.jpg)] h-screen pt-8  w-full flex flex-col justify-end bg-[#fcf2e8]'>
        <div className='bg-white pb-7 py-4 px-4 '>
            <h2 className='text-2xl font-bold ml-10'>Get Started With User</h2>
            <Link to = "/login" className=' flex items-center justify-center w-full bg-black font-bold text-white py-3 rounded mt-4 text-xl '>Continue</Link>
        </div>

      </div>
    </div>
  )
}

export default Start
