"use client";
import React, { useEffect, useTransition } from "react";
import {
  CardTitle,
} from "@/components/ui/card";
import { Peddana } from 'next/font/google'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostForm } from "@/actions/postform";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const postSchema = z.object({
  title: z.string().min(5, "Title should be of atleast 5 characters"),

  description: z
    .string()
    .min(5, "Atleast should be of 5 characters")
    .max(255, "Maximum should be of 255 character"),

  content: z.string().min(255, "Minimum should be of 255 character"),
});

type PostFormValues = z.infer<typeof postSchema>;

const peddana = Peddana({
  subsets: ["latin"],
  weight: "400",
});

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const session=useSession()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({ resolver: zodResolver(postSchema) });

 

  const submission = async (data: PostFormValues) => {
    startTransition(async()=>{
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("content", data.content);
  
  
      const response = await PostForm(formdata)
      if (response.success) {
        toast.success("Post Created Successfully");
        router.push('/blogs')
      } else {
        console.log("Failed to create post");
        toast.error("Post Creation Failed Successfully");
      }
    })
  };
    useEffect(() => {
    if (session.status === "unauthenticated") {
      router.back(); // or router.push('/login')
    }
  }, [session.status, router]);

  if (session.status === "unauthenticated") return null;
  return (
    <div className="px-4 py-4 flex flex-col gap-5">
      <CardTitle
        className={`text-4xl ${peddana.className} underline underline-offset-4 `}
      >
        Post Create Page
      </CardTitle>
      <form onSubmit={handleSubmit(submission)} className="flex flex-col gap-3">
        <div className="flex gap-1 flex-col text-lg">
          <label htmlFor="title">Title</label>
          <Input
            placeholder="Enter the Title"
            {...register("title")}
            disabled={isPending}
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="flex gap-1 flex-col text-lg">
          <label htmlFor="description">Description</label>
          <Input
            {...register("description")}
            placeholder="Enter the Description"
            disabled={isPending}
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-1 flex-col text-lg">
          <label htmlFor="content">Content</label>
          <Textarea
            className="h-30 scroll-auto"
            draggable="false"
            placeholder="Enter the Content"
            disabled={isPending}
            {...register("content")}
          />
          {errors.content && (
            <p className="text-red-400 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* <div className="p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 border gap-2 flex border-white rounded-md px-3 py-1"
          />
          */}
          <Button
            type="submit"
            disabled={isPending}
            className="font-semibold hover:bg-emerald-200 mt-5 w-fit px-3 py-1"
          >
            {isPending ? "Creating post..." : "Create"}
          </Button>
          {/*
          <motion.div className="flex flex-row gap-3">
            {images &&
                 
                  <img
                    src={images}
                    alt="Uploaded Preview"
                    className="w-64 h-auto rounded shadow"
                  />
                
              }
          </motion.div>
          {error ? toast.error(error) : null}
        </div> */}
      </form>
    </div>
  );
};

export default Page;
