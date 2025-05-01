import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'
const Signin = () => {
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const {signin ,isLoggingIn}=userAuthStore();
    const validateForm=()=>{
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    }
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        const succes=validateForm();
        if(succes===true) signin(formData);
    }
    return (
        <div className='flex justify-center bg-gray-800 h-screen'>
        <div className="w-[30%] h-[36rem] flex flex-col p-2 bg-black text-white mt-[2%] pt-16 rounded-2xl transition-shadow duration-500 hover:shadow-[0_0_25px_10px_rgba(255,255,255,0.3)]">
          <div className='ml-[26%] font-bold mb-[10%] text-yellow-500'>
            <p className='text-3xl'>Welcome Back</p>
            <p className='ml-5'>Login to your account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <p className='ml-5 text-yellow-500'>Email</p>
            <input
              type='email'
              className={`m-4 border border-yellow-600 p-2 text-white bg-gray-600 rounded-2xl  w-[90%]`}
              placeholder='Email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <p className='ml-5 text-yellow-500'>Password</p>
            <input
              className={`m-4 border border-yellow-600 p-2 text-white bg-gray-600 rounded-2xl  w-[90%]`}
              type='password'
              placeholder='*******'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <span className='flex justify-center pt-4'>
              <button type="submit" disabled={isLoggingIn} className='mt-6 p-2 w-32 bg-yellow-600 rounded-md hover:bg-yellow-700 hover:scale-105 transition-all duration-300'>
                {
                  isLoggingIn ? (
                    <>
                    <Loader className='size-5 animate-spin'></Loader>
                    Loading...
                    </>
                  ):(
                    "Signin"
                  )
                }
              </button> 
            </span>
          </form>
          <p className='text-yellow-500 mt-6 flex justify-center'>Don't have an account?
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    )
}

export default Signin
