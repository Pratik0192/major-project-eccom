import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import question from '../assets/question.json';
import Lottie from 'lottie-react';

const ForgotPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [data, setData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(backendUrl + '/api/user/forgot-password', data);

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data
        });
        setData({ email: "" });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <section className='w-full mt-10 flex container mx-auto px-2'>
      <div className='bg-white my-4 max-w-lg mx-auto rounded p-7 flex flex-col md:flex-row items-center'>
        <div className='flex-1'>
          <p className='font-semibold text-2xl text-gray-900'>Forgot Password</p>
          <p className='text-md text-gray-600'>Don't fret! Just type in your email and we will send you a code to reset your password!</p>
          <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
              <label className='text-gray-900' htmlFor='email'>Email :</label>
              <input
                type='email'
                id='email'
                className='bg-blue-50 p-2 border rounded outline-none focus:border-gray-300 text-gray-900'
                name='email'
                value={data.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
            </div>

            <button
              type="submit"
              disabled={!data.email || loading}
              className={`${
                data.email ? "bg-[#162556] hover:bg-[#162556]" : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wide`}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <p className='text-gray-900'>
            Already have an account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
          </p>
        </div>
        <div className='flex-1 flex justify-center md:justify-end mt-4 md:mt-0'>
          <Lottie animationData={question} className='w-[300px] md:w-[400px]' />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;