import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function GET(request:Request,
  { params }: { params: { id: string } }
) {
  await db();

  try {
    const {id}=await params
    const response = await Post.findOne({_id:id,published:true}).populate('author', 'username email ');
    if (!response){
      return NextResponse.json({
        success: false,
        message: "Post cannot fetched",
      });
   }
      else{
         return NextResponse.json({
            success:true,
            data:response.toJSON()
         })
      }

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
