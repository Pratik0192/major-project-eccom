import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import lock from '../assets/Capture4.jpg'
import axios from 'axios';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [data, setData] = useState(["", "", "", "", "", ""])
  const inputRef = useRef([])
  const location = useLocation()

  console.log(location);

  useEffect(() => {
    if(!location?.state?.email) {
      navigate("/forgot-password")
    }
  }, [])

  const valideValue = data.every(el => el)

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await axios.put(`${backendUrl}/api/user/verify-forgot-password-otp`, {
        otp: data.join(""),
        email: location?.state?.email,
      });

      if(response.data.error) {
        toast.error(response.data.message)
      }

      if(response.data.success) {
        toast.success(response.data.message)
        setData(["", "", "", "", "", ""])
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email
          }
        })
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className='font-semibold text-center text-lg text-gray-900'>Enter Otp</p>
        <div className='flex items-center justify-center' >   <img src={lock} alt="" />  </div>
        <form className='grid gap-4 py-4' onSubmit={handleSubmit} >
          <div className="grid gap-1">
            <label className='text-gray-900' htmlFor="otp">Enter your 6-digit OTP:</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {
                data.map((element, index) => {
                  return(
                    <input 
                      key={"otp"+index}
                      type="text" 
                      id='otp'
                      ref={(ref) => {
                        inputRef.current[index] = ref
                        return ref
                      }}
                      value={data[index]}
                      onChange={(e) => {
                        const value = e.target.value
                        console.log(value);
                        
                        const newData = [...data]
                        newData[index] = value
                        setData(newData)

                        if(value && index < 5){
                          inputRef.current[index+1].focus()
                        }
                      }}
                      maxLength={1}
                      className='bg-blue-50 text-gray-900 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
                    />
                  )
                })
              }
            </div>
          </div>
          <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>
        </form>

        <p className='text-gray-900'>
          Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  )
}

export default OTPVerification