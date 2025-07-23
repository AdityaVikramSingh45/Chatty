import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isProfileUpdated: false,

    // checkAuth: async () => {
    //   try {
    //     console.log("Inside checkAuth");
    //     const res = await axios.get("http://localhost:4000/api/auth/check", {withCredentials: true});
    //     console.log("res inside checkAuth", res);
    //     set({ authUser: res.data });
    //   } catch (error) {
    //     console.log("Error in checkAuth", error);
    //     set({ authUser: null });
    //   } finally {
    //     set({ isCheckingAuth: false });
    //   }
    // },

    checkAuth: async () => {
        try {
          console.log("Inside checkAuth");
          const res = await axiosInstance.get("/auth/check");
          console.log("res inside checkAuth", res);
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in checkAuth", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async(data)=>{
        set({isSigningUp: true})
        try{
          const res = await axiosInstance.post("/auth/signup", data)
          console.log("res inside signup", res);
          set({authUser: res.data});
          toast.success("Account Created successfully")
        }
        catch(error){
          toast.error(error.response.data.message);
        }finally{
          set({isSigningUp: false})
        }
      },

      login: async(data)=>{
        set({isLoggingIn: true})
        try{
          const res = await axiosInstance.post("/auth/login", data)
          console.log("res inside login", res);
          set({authUser: res.data});
          toast.success("Logged in successfully")
        }
        catch(error){
          toast.error(error.response.data.message);
        }finally{
          set({isLoggingIn: false})
        }
      },

      logout: async()=>{
        set({isLoggingOut: true})
        try{
          const res = await axiosInstance.post("/auth/logout");
          set({authUser: null});
          toast.success("Logged out successfully")
        }
        catch(error){
          toast.error(error.response.data.message)
        }
        finally{
          set({isLoggingOut: false})
        }
      }
}))