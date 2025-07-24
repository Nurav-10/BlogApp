"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import './globals.css'
import { useSession } from "next-auth/react"
import Loader from "@/components/loader"

export default function Home() {
 
  const session=useSession()
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
