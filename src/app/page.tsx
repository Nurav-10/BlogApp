"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import './globals.css'
import { useSession } from "next-auth/react"
import Loader from "@/components/loader"
import { useRouter } from "next/navigation"
import { useProfileStore } from "@/store/profileStore"
import Link from "next/link"
import { X } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Home() {
 
  const router=useRouter()
  const session=useSession()
  const { profilePicModal, setModal } = useProfileStore();
  const toggleModal = useProfileStore((state) => state.toggleModal);
  if(session.status==='loading')
    return <Loader/>
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-background">
      <main>
            
        <Header/>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
