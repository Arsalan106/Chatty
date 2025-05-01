import React, { useState } from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react';
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = userAuthStore();
  const [selectedImg,setSelectedImage]=useState(null);
  const handleImageUpload = async (e) => {
    const file=e.target.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Image=reader.result;
      setSelectedImage(base64Image);
      await updateProfile({profilePic:base64Image})
    };
  };  
  return (
    <div className='h-screen pt-20'>
      <div className='mx-auto max-w-2xl p-4 py-8 '>
        <div className='bg-black rounded-md'>
          <div className='text-center'>
            <h1>Profile</h1>
            <p>Your Profile Information</p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file" 
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
