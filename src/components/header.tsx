"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Code, Cross, CrossIcon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { title } from "process";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "./loader";
import Image from "next/image";
import { Card } from "./ui/card";
import { useProfileStore } from "@/store/profileStore";
import { signOut } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const session = useSession();
  const { profilePicModal, setModal } = useProfileStore();
  const toggleModal = useProfileStore((state) => state.toggleModal);
  const [bugerMenu, setBurgerMenu] = useState(false);
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Blogs",
      href: "/blogs",
    },
  ];

  interface ProfileDetails {
    name: string;
    email: string;
    image: string;
  }


  if (session.status === "loading") return <h2>Loading...</h2>;
  return (
    <motion.header className="w-screen border-b-1 border-zinc-40 flex justify-around flex-row px-4 items-center overflow-hidden">
      <div className="container overflow-x-hidden w-full relative flex h-[8vh] items-center px-5 md:px-2  justify-between sm:space-x-0 0">
        <div className="logo flex gap-2 items-center ">
          <Code color="pink" size={20} />
          <h2 className="text-xl font-semibold mb-0.5 ">DevBlog</h2>
        </div>
        <nav className="items-center text-md gap-10 hidden md:flex justify-between font-semibold">
          {links.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.href}
                className="hover:text-blue-500  dark:text-white rounded-md px-3 py-1 hover:bg-gradient-to-r from-blue-700/40 to-zinc-700/20 transition-all duration-300"
              >
                {item.title}{" "}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          {!session.data?.user?.email && (
            <Button
              className="font-semibold bg-gradient-to-bl from-red-300 to-blue-300"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          )}
          <Menu
            className={`hover:bg-zinc-700 hover:text-white ${
              bugerMenu ? "hidden" : "flex"
            } md:hidden transition-all duration-200 rounded-full w-8 h-8 p-1`}
            onClick={() => setBurgerMenu((prev) => !prev)}
          />
          <X
            className={`hover:bg-zinc-700 hover:text-white transition-all ${
              bugerMenu ? "flex" : "hidden"
            } duration-200 rounded-full w-7 h-7 p-0.5`}
            onClick={() => setBurgerMenu((prev) => !prev)}
          />
          {!session.data?.user?.image ? (
            <Image
              src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-1310.jpg?semt=ais_hybrid&w=740"
              width={10}
              height={10}
              alt="profileImage"
              className="w-10 h-10 rounded-full relative"
              onClick={toggleModal}
            />
          ):
           <Image
              src={session.data.user.image}
              width={100}
              height={100}
              alt="profileImage"
              className="w-10 h-10 rounded-full object-cover border border-zinc-600 relative"
              onClick={toggleModal}
            />
          }
      <div
                className={`${
                  profilePicModal ? "flex flex-col gap-2" : "hidden"
                } fixed z-99 top-14 right-5 w-fit text-sm py-2  bg-zinc-900/80 rounded-md shadow-sm shadow-amber-200 text-zinc-200 font-semibold`}
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
        </div>
      </div>
      <motion.div
        className="absolute flex top-14 right-0 bg-zinc-900 text-white flex-col w-[100%] h-fit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {bugerMenu &&
          links.map((item, index) => {
            return (
              <Link
                href={item.href}
                className="px-2 text-center hover:bg-blue-500 font-semibold transition-all border-white duration-200 ease-in-out py-4"
                key={index}
              >
                {item.title}
              </Link>
            );
          })}
      </motion.div>
    </motion.header>
  );
}
