import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest,
  { params }: { params: {id:string;commentId: string } }) {

  const commentId=params.commentId
  const postId=params.id

  await db();

  async function deleteWithReplies(id: string) {
    const replies = await Comment.find({ replies: id });
    for (const reply of replies) {
      await deleteWithReplies(reply._id.toString());
    }
    await Comment.findByIdAndDelete(id);
  }

  try {
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
