import { NextResponse } from "next/server";
import Upvotes from '@/models/upvotesModel'
import User from "@/models/userModel";
export async function GET(request:Request,{params}:{params:{id:string}}){

   const {id}=await params
   try{
      const data=await Upvotes.find({postId:id}).populate('userId','email username');
      return NextResponse.json({success:true,data:data})
   }
   catch(err:any){
      return NextResponse.json({success:false,message:err.message})
   }
}