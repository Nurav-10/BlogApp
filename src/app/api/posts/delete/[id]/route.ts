import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { success } from "zod/v4";

db()

export async function GET(request:Request,{params}:{params:{id:string}}){
   await db()
   const {id}=await params
   try{
      await Comment.deleteMany({post:id})
      
       await Post.findByIdAndDelete(id)
     
         return NextResponse.json({
            success:true,
            message:'Post Deleted Successfully'
         })

      }
   catch(error:any)
   {
      return NextResponse.json({
         success:false,
         message:error.message
      })
   }

}