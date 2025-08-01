'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AnimatedLogin from "@/components/animatedLogin";
import { useAuth } from "../../../context/authContext";



const Page = () => {
  const router=useRouter()
  const {loading,user}=useAuth()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  useEffect(()=>{
    if(user?.id)
     router.push('/')
  },[user])

  const handleSignup=async()=>{
    if(!username || !email || !password)
      toast.error('Please provide all fields')

    try{
      const response=await fetch('/api/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password,username})
      })
      const res=await response.json()
        toast.success('Registered successfully',res.message)
        router.push('/login') 
    }
    catch
    {
      toast.error("Error while registering the user")
    }
  }
  
  return (
  <>
    <div className="w-screen h-screen text-white flex flex-row justify-center items-center overflow-x-hidden">
      <AnimatedLogin/>
      <div className="w-[90vw] flex px-2  py-5 justify-center">
        <Card className="w-full max-w-sm border border-black to-white-300">
              <form onSubmit={
                async(e)=>{e.preventDefault()
                handleSignup()
              }}>
            <CardHeader>
              <CardTitle className="text-xl mb-5 border-2 border-blue-200/40 bg-gradient-to-bl from-cyan-300/80 to-purple-400/80 w-fit rounded-md px-2 py-1 text-transparent bg-clip-text">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input         
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input                 
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password123"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button type="submit" className="w-full">
                SignUp
              </Button>
              {/* <Button variant="outline" type="submit" className="w-full border-black">
          Login with Google */}
              {/* </Button> */}
              <Link
                href={"/login"}
                className="hover:text-blue-600 transition-all duration-200"
              >
                Already have an account? Login
              </Link>
            </CardFooter>
              </form>
        </Card>
      </div>
    </div>
    </>
    )
  }
export default Page;
