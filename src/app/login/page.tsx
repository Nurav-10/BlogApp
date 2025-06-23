'use client'
import { Loginform } from "@/components/clientActions/loginform"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const page = () => {
  const session=useSession()
  const router=useRouter()
  session.status==='authenticated'&&
  router.push('/')
   return <Loginform/>
    
}

export default page