import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../Context/UserContext";
import { useContext } from "react";

const UserSignup = () => {

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  // To store the user data 
  const [userData, setUserData]= useState({});
   
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);


  const submitHandler = async(e) => {
    e.preventDefault();

    const newUserData = { 
      fullName:{
        firstName:firstName,     // this will used because we need to send the updated data not the previous data
        lastName:lastName
      },
      email: email,
      password: password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUserData);
    if(response.status === 201){
      const data = response.data;
       // localStorage ka use hum isliye kar rahe hai agar user refresh karega to data lose ho jayega to user  logout ho jayega isliye local storage me save kar rahe hai kyuki local storage me data ke token save karte hai vo refresh hone ke baad bhi save rahta hai
       localStorage.setItem("token", data.token);
      setUser(data.user);

      navigate('/home');

    };
  
    // console.log(newUserData); // Logs immediately
    // setUserData(newUserData);   

    setFirstName("");
    setLastName("");
    setEmail(""); 
    setPassword("");
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-25 mb-8"
          src="https://tse3.mm.bing.net/th?id=OIP.9UnwWZb1MMVd0efmk4vVowHaCL&pid=Api&P=0&h=180"
        />
        <form onSubmit={(e)=> submitHandler(e)}>

          <h3 className="text-lg font-medium mb-1">Full Name</h3>
          <div className="flex  gap-4 mb-5">
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


          <h3 className="text-lg font-medium mb-1">Enter Email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-1 mb-5 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            placeholder="email@example.com"
            required
            onChange={(e)=> setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-1">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-1 mb-5 border w-full text-lg placeholder:text-base"
            value={password}
            type="password"
            placeholder="password"
            required
            onChange={(e)=> setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white h-10 font-bold mb-3 mt-4 rounded px-4 px-7 w-full text-xl">
            Create account
          </button>
          <p> Already Have an Account ?  <Link to="/login" className="text-blue-600" >Login Here </Link></p>
        </form>
      </div>
      <div>
          <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  )
}

export default UserSignup
