import db from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/models/commentModel";

export async function DELETE(request:NextRequest,{params}:{params:{id:string;commentId:string}}){

   await db()
   const {commentId}=await params

   try{
      //check if it is not reply.

      const reply=await Comment.findById({_id:commentId})

      if(!reply)
         return NextResponse.json({success:false,message:'Comment not found'})

      //comment with no replies
      if(!reply.replies)
         return NextResponse.json({success:false,message:'This is not a reply'})

      //if there is reply.
      await Comment.findByIdAndDelete(commentId)

      return NextResponse.json({success:false,message:'Reply deleted successfully'})
   }
   catch(error){
      return NextResponse.json({success:false,message:error})
   }
}