import db from "@/dbconfig/dbconfig";
import Post from "@/models/postModel";
import { Comment } from "@/models/commentModel";
import { NextResponse,NextRequest } from "next/server";

export async function GET(request:Request,
  context: { params:Promise<{ id: string }> }
) {
  await db();

  try {
    const {id}=await context.params
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

export async function DELETE(request:Request,context: { params:Promise<{ id: string }> }){
   await db()
   const {id}=await context.params
   try{
      await Comment.deleteMany({post:id})
      
       await Post.findByIdAndDelete(id)
     
         return NextResponse.json({
            success:true,
            message:'Post Deleted Successfully'
         })

      }
   catch(error)
   {
      return NextResponse.json({
         success:false,
         message:error
      })
   }

}

//for editing.



export async function PATCH(request:Request,context: { params:Promise<{ id: string }> })
{
   await db()
   try {
      const {id}=await context.params
      const body=await request.json()
      const updatedPost=await Post.findByIdAndUpdate(id,body,{
         new:true,
         runValidators:true
      })

      if(updatedPost)
      {
         return NextResponse.json({
            success:true,
            message:'Post Updated Successfully',
            data:updatedPost
         })

      }
      else{
         return NextResponse.json({
            success:false,
            message:'Post not found',
            status:404
         })
      }
   } catch (error:any) {
      return NextResponse.json({
         success:false,
         message:error.message
      })
   }
}