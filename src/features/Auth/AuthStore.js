import { create } from "zustand";
import axiosClient from "../../plugins/axiosClient";

const useAuthStore = create(() => ({
  register: async(payload)=> {
    try{
      const response = await axiosClient.post('/auth/signup', payload)
      console.log(response)
    }catch(error){
      console.error(error)
    }
  },
  login: async(payload)=> {
    try{
      const response = await axiosClient.post('/auth/signin', payload)
      console.log(response)
      if(response?.tokens?.acces_token){
        localStorage.setItem('token', response?.tokens?.acces_token)
      }
    }catch(error){
      console.error(error)
    }
  },
}))

export default useAuthStore