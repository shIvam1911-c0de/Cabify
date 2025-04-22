import React, { use, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../Context/CaptainContext";

const CaptainLogin = () => {

  const navigate = useNavigate();
  const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
  
    // To store the user data 
    // const [captainData, setCaptainData]= useState({});

    const { captain, setCaptain } = useContext(CaptainDataContext);
  
  
    const submitHandler = async(e) => {
      e.preventDefault();
  
      const captainData = {      // this will used because we need to send the updated data not the previous data
        email: email,
        password: password
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      if(response.status === 200){
        const data = response.data;
        setCaptain(data.captain);
        // localStorage ka use hum isliye kar rahe hai agar user refresh karega to data lose ho jayega to user  logout ho jayega isliye local storage me save kar rahe hai kyuki local storage me data ke token save karte hai vo refresh hone ke baad bhi save rahta hai
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }


    
      // console.log(captainData); // Logs immediately
      // setCaptainData(captainData);   
  
      setEmail(""); 
      setPassword("");
    }
  return (
        <div className="p-7 h-screen flex flex-col justify-between">
          <div>
            <img
              className="w-25 mb-8"
              src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
            />
            <form onSubmit={(e)=> submitHandler(e)}>
              <h3 className="text-lg font-medium mb-1">What's our Captain's email</h3>
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 mb-5 border w-full text-lg placeholder:text-base"
                type="email"
                value={email}
                placeholder="email@example.com"
                required
                onChange={(e)=> setEmail(e.target.value)}
              />
              <h3 className="text-lg font-medium mb-1">Enter Password</h3>
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 mb-3 border w-full text-lg placeholder:text-base"
                value={password}
                type="password"
                placeholder="password"
                required
                onChange={(e)=> setPassword(e.target.value)}
              />
              <button className="bg-[#111] text-white h-10 font-bold mb-3 mt-4 rounded px-4 px-7 w-full text-xl">
                Login
              </button>
              <p> Join a fleet ? <Link to="/captain-signup" className="text-blue-600" >Register As a Captain </Link></p>
            </form>
          </div>
          <div>
            <Link to="/login" className="bg-[#d5622d] flex items-center justify-center text-white h-10 font-bold mb-7 mt-2 rounded px-4 px-7 w-full text-xl">Sign in As User</Link>
          </div>
        </div>
  )
}

export default CaptainLogin
