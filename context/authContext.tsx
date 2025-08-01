'use client'
import { clearSession, LoginAction } from "@/actions/loginAction"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import React from "react"
import { toast } from "sonner"

type User={
   id:string,
   username:string,
   email:string,
   profilePicture:string
}



interface AuthContextValue{
   login(email:string,password:string):Promise<void>,
   logout():Promise<void>,
   loading:boolean,
   user:User | null
}

const AuthContext=createContext<AuthContextValue>({
   user:null,
   loading:true,
   login:async()=>{},
   logout:async()=>{}
})

export const AuthProvider=({children}:{children:React.ReactNode})=>{
   const router=useRouter()
   const [user,setUser]=useState<User|null>(null)
   const [loading,setLoading]=useState(false)
   const login=async(email:string,password:string)=>{
      try{
         setLoading(true)
         const response=await LoginAction(email,password)
         if(response.success && response?.data){
            setUser(response?.data)
            toast.success(response.message)
            router.push('/')
            return

         }

         toast.error(response.message)
      }
      catch{
         toast.error('There is some problem while logging')
      }
      finally{
         setLoading(false)
      }
   }
   const fetchUser = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/me", { credentials: "include" });
    const data = await res.json();
    setUser(data?.user || null);
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

   const logout=async()=>{
      setUser(null)

      await clearSession()
      router.push('/login')
      
   }
   useEffect(()=>{
      fetchUser()
   },[])

   
   return(
      <AuthContext.Provider value={{user,login,logout,loading}}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth=()=>{
   const context=useContext(AuthContext)
   if(!context){
      toast.error(`Context can't be user here`)
   }
   return context
}
