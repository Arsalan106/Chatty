import { create } from "zustand"
import { axiosInsatance } from "../lib/axios"
import toast from "react-hot-toast";
export const userAuthStore= create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth:async ()=>{
        try{
            const res=await axiosInsatance.get("/users/check");
            set({ authUser: res.data });
        } catch(error){
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally{
            console.log("from exios")
            set({isCheckingAuth:false});
        }
    },
    signup:async (data)=>{
        set({isSigningUp:true});
        try{
            const res= await axiosInsatance.post("/users/signup",data,{ withCredentials: true });
            set({authUser:res.data});
            toast.success("Account Created successfully")
        } catch(error){
            toast.error(error.response.data.message)
        } finally{
            set({isSigningUp:false});
        }
    },
    logout:async ()=>{
        try{
            await axiosInsatance.post("/users/logout");
            set({authUser:null});
            toast.success("logout succesfully");
        } catch(error){
            toast.error(error.response.message);
        }
    },
    signin:async(data)=>{
        set({isLoggingIn:true});
        try{
            const res=await axiosInsatance.post("/users/signin",data)
            set({authUser:res.data});
            toast("logged in succussfully")
        } catch(error){
            toast.error(error.response.message);
        } finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile:async(data)=>{

    }
}))
