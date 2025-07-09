"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Navigation2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { date } from "@/utils/date";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface blog {
  title: string;
  description: string;
  _id: string;
  author: {
    username: string;
  };
  createdAt: Date;
}
const BlogsPage = () => {
  const router = useRouter();
  const session = useSession();
  const [canCreate, setCanCreate] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    //api calls for post title and description
    const fetchPost = async () => {
      try {
        const res = await (await fetch("/api/posts")).json();
        if (res) {
          setData(res.data);
          if (session.status === "authenticated") setCanCreate(true);
        }
      } catch (error: any) {
        setError(error.message);
        toast.error("Post Fetching failed");
        console.log(error.message);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex flex-row gap-1 absolute top-10">
          <button
            className={`md:hidden block rounded-full  -rotate-90`}
            onClick={() => router.back()}
          >
            <Navigation2 fill="pink" />
          </button>
          <button
            className={`md:hidden block rounded-full transition-all duration-300 p-1 ${
              sideNav ? "rotate-180" : "rotate-90"
            }`}
            onClick={() => setSideNav((prev) => !prev)}
          >
            <Navigation2 fill="pink" />
          </button>
        </div>
        {canCreate && (
          <button
            className="text-white fixed left-5 bottom-5 bg-black hover:bg-amber-200 px-4 py-2 dark:bg-white rounded-md dark:text-black transition-all duration-200 hover:scale-102 font-semibold  z-99 shadow-sm shadow-amber-200"
            onClick={() => router.push("/blogs/create")}
          >
            Create Blog
          </button>
        )}
        <div
          className={`w-80 h-screen border-r-1  border-zinc-400 ${
            sideNav ? "flex" : "hidden"
          } flex-col gap-5 py-3 px-2 z-99`}
        >
          {data.map((blog: blog, index:number) => {
            return (
              <li
                className="list-none hover:text-blue-500 cursor-pointer"
                onClick={() => router.push(`/blogs/${blog._id}`)}
                key={index}
              >
                {blog.title}
              </li>
            );
          })}
        </div>

        <div className="w-full h-full grid md:grid-cols-3 grid-cols-2 p-5 gap-2">
          {data.map((blog: blog,index:number) => {
            return (
              <Card key={index}
                className="max-h-[40vh] overflow-hidden p-3 hover:scale-101 trnsition-all duration-300 ease-linear cursor-pointer"
                onClick={() => router.push(`/blogs/${blog._id}`)}
              >
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  Created By {blog.author.username}
                </CardDescription>
                <CardDescription>{date(blog.createdAt)}</CardDescription>
                <CardDescription>{blog.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
