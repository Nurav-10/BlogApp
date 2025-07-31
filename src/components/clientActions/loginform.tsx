"use client";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardHeader,
  CardAction,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { loginHandler } from "@/actions/login";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
export const Loginform = () => {
  const [isPending,startTransition]=useTransition()
  const router = useRouter();
  
  
   const handleSubmit=async(e:React.FormEvent) => {
            e.preventDefault();
            const formdata=new FormData(e.currentTarget as HTMLFormElement)
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;

            if (!email || !password) {
              toast.error("Please Provide all fields");
              return;
            }
            const toastId = toast.loading("Logging in...");

            const error = await loginHandler(email, password);
            if (!error) {
              toast.success("Login successful!", { id: toastId });
              startTransition(()=>{
                router.push("/");
              })
            } else {
              toast.error(String(error), { id: toastId });
            }}
  return (
    <div className="mx-auto w-[90vw] h-[91vh] text-white flex  justify-center items-center overflow-x-hidden">

      <Card className="w-full max-w-sm border border-black to-white-300">
       
            <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl mb-5 border-2 border-pink-300/40 bg-gradient-to-bl from-yellow-300/80 to-red-400/80 w-fit rounded-md px-4 py-1 text-transparent bg-clip-text">Login</CardTitle>
          </CardHeader>
          <CardContent className="mb-5">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
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
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password123"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending?'Loging in...':'Login'}
            </Button>
            {/* <form
              action={async () => {
                await GithubHandler();
              }}
            >
              <Button
                variant="outline"
                type="submit"
                className="w-full border-black hover:bg-amber-100"
              >
                Login with GitHub
              </Button>
            </form> */}
            <Link
              href={"/signup"}
              className="hover:text-blue-600 transition-all duration-200"
            >
              Don't have an account? Signup
            </Link>
          </CardFooter>
        </form>
      </Card>
    
    </div>
  );
};
