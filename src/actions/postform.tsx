"use server";

import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";


await db();

export async function PostForm(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;

    try {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  //verify.
  if (token) {
    const user = await jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }
  
      const newPost = await Post.create({
        title,
        description,
        content,
        author: user.id.toString(),
      });
      await newPost.save();
      revalidatePath("/");
      revalidatePath("/posts/create");
      return {
        success: true,
        message: "Post created successfully",
      };
    }
      else {
    window.location.href='/'
  }


   } catch (error) {
      return {
        success: false,
        message: "Error while creating post",
      };
    }
  } 
