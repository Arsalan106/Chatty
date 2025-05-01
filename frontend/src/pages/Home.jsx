import React, { useEffect, useState } from 'react'
import { axiosInsatance } from '../lib/axios';
const Home = () => {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    const getUser=async()=>{
      try{
        const res=await axiosInsatance.get("/message/get-users");
        console.log("all users",res.data);
        setUsers(res.data);
      }
      catch(error){
        console.log("error in fetching the logged in users",error);
      }
    }
    getUser();
  },[])
  return (
    <div>

    </div>
  )
}

export default Home
