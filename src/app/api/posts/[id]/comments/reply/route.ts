import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest,context: { params:Promise<{ postId: string }> }){

   await db()
   try{
      const {content,author,parentId}=await request.json();
      const {postId}=await context.params

      if(!content || !author || !parentId)
         return NextResponse.json({success:false,message:'Missing fields'})

      //creating reply
      const reply=await Comment.create({
         content,
         author,
         post:postId
      })

      //pushing the reply into parent comment.
      await Comment.findByIdAndUpdate(parentId,{
         $push:{replies:reply._id},
         $set:{updatedAt:new Date()}
      })

      return NextResponse.json({success:true,reply},{status:201});
   }

   catch(err){
      return NextResponse.json({success:false,status:500,error:err})

   }
}