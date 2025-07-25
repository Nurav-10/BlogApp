import { NextResponse } from "next/server";
import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";


export async function GET(request:Request){

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
   catch(error)
   {
      return NextResponse.json({
         success:false,
         message:'Post Cannot setched',
         error:error
      })
   }
}
