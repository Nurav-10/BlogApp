import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  const commentId =await params.commentId;

  if (!commentId) {
    return NextResponse.json({
      success: false,
      message: "Error while deleting the comment",
    });
  }
  
  try {
  await db();
  
        const reply=await Comment.findById({_id:commentId})
  
        if(!reply)
           return NextResponse.json({success:false,message:'Comment not found'})
  
        //comment with no replies
        if(reply.replies){
        //if there is reply.
        await Comment.findByIdAndDelete(commentId)
  
        return NextResponse.json({success:true,message:'Reply deleted successfully'})
        }

  async function deleteWithReplies(id: string) {
    const replies = await Comment.find({ replies: id });
    for (const reply of replies) {
      await deleteWithReplies(reply._id.toString());
    }
    await Comment.findByIdAndDelete(id);
  }

    await deleteWithReplies(commentId);

    return NextResponse.json({
      success: true,
      message: "Comment deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
