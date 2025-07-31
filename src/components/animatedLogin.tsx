"use client";
import React from "react";
import { Lora } from "next/font/google";
import { motion } from "motion/react";
import Image from "next/image";
import loginBg from "../../public/loginBg.jpg";
const lora = Lora({
  subsets: ["latin"],
});
const AnimatedLogin = () => {
  return (
    <div className="relative hidden md:w-[70%] lg:w-[100%] border-r-1 border-zinc-400 h-screen items-center justify-center lg:flex flex-col gap-5">
      <Image src={loginBg} alt="Login-bg-image" className="object-cover" />
      <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-tr flex-col from-zinc-800/30 to-zinc-400/60 backdrop-blur-[0.8px]">
         <motion.span
        className={`text-8xl tracking-tight text-zinc-900 py-4 px-4 font-bold ${lora.className}`}
      >
        BlogApp
      </motion.span>
      <div
        className={`flex flex-col items-center gap-1 ${lora.className} tracking-wider text-zinc-800 font-bold `}
      >
        <span className="text-3xl">Welcome to Your Creative Space!</span>
        <span className="text-xl">Write. Publish. Inspire.</span>
      </div>
      </div>
    </div>
  );
};

export default AnimatedLogin;
