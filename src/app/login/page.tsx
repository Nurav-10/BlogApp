'use client'
import { Loginform } from "@/components/clientActions/loginform"
import { useEffect } from "react"
import { useAuth } from "../../../context/authContext"
import { useRouter } from "next/navigation"
const Page = () => {
  const router=useRouter()
  const {loading,user}=useAuth()
  useEffect(()=>{
    if(user?.id) router.push('/')
  },[user])
  return <Loginform/>
}

export default Page