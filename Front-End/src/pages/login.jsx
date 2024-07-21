import React, { useState } from "react";
import LoginPic from "../assets/loginpic.svg";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Fields are required!");
    } else {
      try {
        const response =await axios.post("http://207.154.232.68/api/auth/login",{
          username:email,
          password,
        });
        if (response.status === 200){
          Cookies.set("jwt",response.data.token);
          Cookies.set("role" , response.data.user.role);
        }
        window.location.pathname = "/dashboard";
        setError(""); // da 34an lw msh empty
      } catch (error) {
        setError("Wrong Data Sent!")
      }
     
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-normal overflow-hidden">
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center lg:flex-row w-11/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
      
        <div className="w-full lg:w-1/2 py-16 px-6 lg:px-12 flex-1">
          <form onSubmit={handleSubmit}>
       
            <div>
              <label htmlFor="emailInput" className="text-secondaryColor max-sm:ml-1 ml-[0.4rem] font-spartan font-normal text-[15px]">
                Email Address
              </label>
              <div className="flex justify-start items-center bg-[#f7f7f7] max-sm:mx-1 p-3 w-[380px] rounded-3xl mt-2">
                <MdOutlineEmail className="text-[#707070] text-2xl" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  id="emailInput"
                  className="border-none focus:border-none focus:outline-none outline-none w-full bg-[#f7f7f7]"
                />
              </div>
            </div>
         
            <div className="mt-5">
              <label htmlFor="passwordInput" className="text-secondaryColor max-sm:ml-1 ml-[0.4rem] font-spartan font-normal text-[15px]">
                Password
              </label>
              <div className="flex justify-between items-center bg-[#f7f7f7] p-3 w-[380px] rounded-3xl mt-2 max-sm:mx-1">
                <IoKeyOutline className="text-black text-2xl" />
                <input
                  className="border-none focus:border-none focus:outline-none outline-none w-full bg-[#f7f7f7]"
                  type={visible ? "text" : "password"}
                  id="passwordInput"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div onClick={() => setVisible(!visible)} className="cursor-pointer">
                  {visible ? (
                    <FaRegEyeSlash className="text-secondaryColor text-2xl" />
                  ) : (
                    <FaEye className="text-secondaryColor text-2xl" />
                  )}
                </div>
              </div>
            </div>
          
            <div className="mt-5 flex justify-center w-full">
              <button type="submit" className="w-40 text-center cursor-pointer bg-gradient-to-r from-[#01E5B2] to-[#01B68D] text-white font-bold py-2 px-4 rounded-full flex items-center justify-between outline-none border-none">
                <span className="flex-1 font-extrabold">LOGIN</span>
                <span className="flex-0 rounded-full text-secondaryColor bg-white p-2 items-center flex justify-center"><IoIosLogOut className="text-gray-500 text-sm" /></span>
              </button>
            </div>
          </form>
        </div>
  
        
        <div className="hidden sm:flex w-full lg:w-1/2 items-center p-6 lg:p-12 bg-no-repeat bg-cover bg-center">
          <img
            src={LoginPic}
            alt="LoginPage"
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Login;
