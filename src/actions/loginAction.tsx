"use server"
import db from "@/dbconfig/dbconfig";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { toast } from "sonner";

type User={
   id:string,
   username:string,
   email:string,
   profilePicture:string
}

type Payload={
  id:string,
  username:string,
  email:string,
  profilePicture:string
}
 

type ApiResponse<T> =
  | { success: true; message: string; data: T }
  | { success: false; message: string; data?: undefined };

export const LoginAction = async (email: string, password: string):Promise<ApiResponse<User>> => {
  await db();
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return {
        success: false,
        message: "Cannot find the user",
      };

    //check the password.
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {

    // if correct credentials store the token.
    const payload = {
      id: user._id,
      email: user.email,
      profilePicture:user.profilePicture,
      username:user.username
    };

      await TokenCreation(payload)
      return {
        success: true,
        message: "Login Successfully",
        data:{
        id:user._id.toString(),
        email:user.email,
        username:user.username,
        profilePicture:user.profilePicture
      }
      };
    }

    return {
      success: false,
      message: "Incorrect credentials",
    };
  } catch {
    return{
      success: false,
      message: "Please provide the correct credentails",
    };
  }
};

export const TokenCreation=async(payload:Payload)=>{
   const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    const cookieStore=await cookies()
      cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
}

export const clearSession=async()=>{
  const cookieStore=await cookies()
  cookieStore.set("token",'')
}

export const getUpdatedData=async(email:string)=>{
 try {
  const response=await User.findOne({email}).select("username _id profilePicture email")

  const payload = {
      id: response._id.toString(),
      email: response.email,
      profilePicture:response.profilePicture,
      username:response.username
    };

  await TokenCreation(payload)
  return {
    success:true,
    message:'Successfully fetched updated data',
    data:response
  }


 } catch  {
  toast.error('Cannot fetched the updated data')
  return
 }
}
