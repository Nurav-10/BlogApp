"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import './globals.css'
import Loader from "@/components/loader"
import { useAuth } from "../../context/authContext"

export default function Home() {
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
