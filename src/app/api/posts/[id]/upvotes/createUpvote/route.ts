import { NextResponse } from "next/server";
import Upvotes from '@/models/upvotesModel'
export async function POST(request:Request){

   const {userId,postId}=await request.json()
   try{
      //check if already upvoted.
      const upvoteExist=await Upvotes.findOne({userId,postId})

      if(upvoteExist) return NextResponse.json({success:true,message:'Already Voted'})

      await Upvotes.create({userId,postId})

      return NextResponse.json({success:true,message:'Voted Successfully'})
   }
   catch(err:any)
   {
      return NextResponse.json({success:true,message:err.message})
   }
}