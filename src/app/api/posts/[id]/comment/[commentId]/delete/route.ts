import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import { NextResponse } from "next/server";
import { success } from "zod/v4";

export async function DELETE(request:Request,{ params }: { params: { commentId: string } }) {
  const commentId=params.commentId

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
  } catch (error: any) {
     console.log(error.message)
    return NextResponse.json({
      success: false,
      message: error.message,
   });
  }
}
