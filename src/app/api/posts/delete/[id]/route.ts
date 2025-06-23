import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { success } from "zod/v4";

db()

export async function GET(request:Request,{params}:{params:{id:string}}){
   await db()
   const {id}=await params
   try{
      const response=await Post.findByIdAndDelete(id)
      if(response)
      {
         return NextResponse.json({
            success:true,
            message:'Post Deleted Successfully'
         })

      }
      else
      {
           return NextResponse.json({
            success:false,
            message:'Post cannot be deleted'
         })
      }
   }
   catch(error:any)
   {
      return NextResponse.json({
         success:false,
         message:error.message
      })
   }

}