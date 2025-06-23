import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";


export async function PATCH(request:Request,{params}:{params:{id:string}})
{
   await db()
   try {
      const {id}=await params
      const body=await request.json()
      const updatedPost=await Post.findByIdAndUpdate(id,body,{
         new:true,
         runValidators:true
      })

      if(updatedPost)
      {
         return NextResponse.json({
            success:true,
            message:'Post Updated Successfully',
            data:updatedPost
         })

      }
      else{
         return NextResponse.json({
            success:false,
            message:'Post not found',
            status:404
         })
      }
   } catch (error:any) {
      return NextResponse.json({
         success:false,
         message:error.message
      })
   }
}