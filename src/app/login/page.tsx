'use client'
import { Loginform } from "@/components/clientActions/loginform"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
  const session=useSession()
  const router=useRouter()
  useEffect(()=>{
    if(session.status==='authenticated') 
      router.push('/')
  },[session.status])
   return <Loginform/>
    
}

export default Page