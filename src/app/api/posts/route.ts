import { NextResponse } from "next/server";
import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";

interface response{
   title:string,
   description:string,
   id:string,
   author:{
      name:string,
   },
   createdAt:string
}

export async function GET(){

   await db()
   //db call
   try{
   const res=await Post.find().populate('author',"username email")

   return NextResponse.json({
      success:true,
      message:'Post fetched successfully',
      data:res
   })
   }
   catch(error:any)
   {
      return NextResponse.json({
         success:false,
         message:'Post Cannot setched',
         error:error.message
      })
   }
}
