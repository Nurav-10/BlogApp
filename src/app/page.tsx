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
            <div
                className={`${
                  profilePicModal ? "flex flex-col gap-2" : "hidden"
                } absolute top-14 right-0 w-fit text-sm py-2  bg-zinc-900/80 rounded-md shadow-sm shadow-amber-200 text-zinc-200 font-semibold`}
              >
                <h2 className="text-center text-lg border-b-1 border-b-white  px-10">
                  Profile
                </h2>
                <X size={20} onClick={toggleModal} className="absolute right-3 rounded-md border border-zinc-400 hover:text-red-500 top-3"/>
               
                { session.data?
                <div className="px-4 py-1 flex flex-col gap-1 items-center">
                  <Link href="/profile" className="border hover:bg-blue-500 rounded-md px-2 py-1 border-zinc-400 text-sm">
                  {session.data?.user?.image?'Update Profile Image':'Add Profile Image'}
                </Link>
                <h2 className="">{session.data?.user?.email}</h2>
                <h2 className="text-right">{session.data?.user?.name}</h2>
                <Button
                  className="bg-red-500 text-white font-semibold rounded-md w-32 hover:bg-red-400"
                  onClick={() => signOut()}
                >
                  Logout
                </Button></div>
                 :
                 <div className="px-2 py-1 flex justify-center">
                <Link href='/login' className="rounded-md px-3 py-1 border border-zinc-300 hover:bg-blue-400">Login</Link>
                </div>
                }
               </div>
        <Header/>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
