import { NextRequest, NextResponse } from "next/server";
import Upvotes from '@/models/upvotesModel'
export async function POST(request:NextRequest){

   const {userId,postId}=await request.json()
   try{
      //check if already upvoted.
      const upvoteExist=await Upvotes.findOne({userId,postId})

      if(upvoteExist) return NextResponse.json({success:true,message:'Already Voted'})

      await Upvotes.create({userId,postId})

      return NextResponse.json({success:true,message:'Voted Successfully'})
   }
   catch(err)
   {
      return NextResponse.json({success:true,message:err})
   }
}