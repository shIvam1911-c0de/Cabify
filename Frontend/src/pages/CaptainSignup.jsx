import React, { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const CaptainSignup = () => {

  const navigate = useNavigate();

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')

  // const [ captainData, setCaptainData ] = useState({})

  const { captain, setCaptain } = useContext(CaptainDataContext);



  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullName:{
        firstName:firstName,     // this will used because we need to send the updated data not the previous data
        lastName:lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status === 201){
      const data = response.data;
       // localStorage ka use hum isliye kar rahe hai agar user refresh karega to data lose ho jayega to user  logout ho jayega isliye local storage me save kar rahe hai kyuki local storage me data ke token save karte hai vo refresh hone ke baad bhi save rahta hai
       localStorage.setItem("token", data.token);
      setCaptain(data.captain);

      navigate('/captain-home');
    }

    // console.log(captainData);
    // setCaptainData(captainData);


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }


  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-15 mb-3"
          src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
        />
        <form onSubmit={(e)=> submitHandler(e)}>

          <h3 className="text-lg font-medium mb-1"> Captain Full Name</h3>
            <div className="flex gap-4 mb-3">
            <input
              className="bg-[#eeeeee] rounded px-4 py-1  border w-1/2 text-lg placeholder:text-base"
              type="text"
              value={firstName}
              placeholder="First Name"
              required
              onChange={(e)=> setFirstName(e.target.value)}
            />
            <input 
            className="bg-[#eeeeee] rounded px-4 py-1  border w-1/2 text-lg placeholder:text-base"
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e)=> setLastName(e.target.value)}
            />
            </div>


          <h3 className="text-lg font-medium mb-1">Enter Captain Email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-1 mb-3 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            placeholder="email@example.com"
            required
            onChange={(e)=> setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-1">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-1 mb-3 border w-full text-lg placeholder:text-base"
            value={password}
            type="password"
            placeholder="password"
            required
            onChange={(e)=> setPassword(e.target.value)}
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-4'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-1 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4  border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white h-10 font-bold mt-3 mb-2 rounded px-4 px-7 w-full text-xl">
            Create Captain Account
          </button>
          <p> Already Have an Account ?  <Link to="/captain-login" className="text-blue-600 mb-3" >Login Here </Link></p>
        </form>
      </div>
      {/* <div>
          <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div> */}
    </div>
  )
}

export default CaptainSignup
