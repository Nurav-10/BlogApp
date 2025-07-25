import { NextRequest, NextResponse } from "next/server";
import Upvotes from '@/models/upvotesModel'
export async function DELETE(request:NextRequest) {
   const {userId,postId,id}=await request.json()
   console.log(userId,postId,id)
   try {
      await Upvotes.findByIdAndDelete({_id:id,postId:postId,userId:userId})
      return NextResponse.json({success:true,message:'Successfully remove upvote'})
   } catch (err) {
      return NextResponse.json({success:false,message:err})
      
   }
}