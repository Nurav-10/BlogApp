import { NextResponse,NextRequest } from "next/server";
import Upvotes from '@/models/upvotesModel'
export async function GET(request:Request,{params}:{params:{id:string}}){

   const {id}=await params
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
   const {userId,postId,id}=await request.json()
   console.log(userId,postId,id)
   try {
      await Upvotes.findByIdAndDelete({_id:id,postId:postId,userId:userId})
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
      return NextResponse.json({success:true,message:err})
   }
}