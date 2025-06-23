"use server";
import { auth } from "@/auth";
import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { revalidatePath } from "next/cache";

await db();
export async function PostForm(formData: FormData) {
  const session: any = await auth();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;

  if (!session || !session.user || !session.user.id) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }
  try {

    const newPost = await Post.create({
      title,
      description,
      content,
      author: session.user.id.toString(),
    });
    await newPost.save();
    revalidatePath("/");
    revalidatePath("/posts/create");
    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (error: any) {
    console.log("Error while creating Post", error.message);
    return {
      success: false,
      message: "Error while creating post",
    };
  }
}
