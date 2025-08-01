import { NextResponse,NextRequest } from "next/server";
import Upvotes from '@/models/upvotesModel'
import db from "@/dbconfig/dbconfig";
export async function GET(request:Request,context:{params:Promise<{id:string}>}){

   const {id}=await context.params
   try{
      const data=await Upvotes.find({postId:id}).populate('userId','email username');
      return NextResponse.json({success:true,data:data})
   }
   catch(err){
      return NextResponse.json({success:false,message:err})
   }
}

//for deleting upvotes
export async function DELETE(request:NextRequest) {
   const {id}=await request.json()
   try {
      await Upvotes.findByIdAndDelete(id)
      return NextResponse.json({success:true,message:'Successfully remove upvote'})
   } catch (err) {
      return NextResponse.json({success:false,message:err})
      
   }
}


//for creating upvotes.
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
      return NextResponse.json({success:false,message:err})
   }
}