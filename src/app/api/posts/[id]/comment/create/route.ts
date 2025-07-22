import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db();
  const { id } = await params;
  try {
    const {content,author} = await request.json();
   const res=await Comment.create({
      content,
      post:id,
      author,
    });
    if (res) {
      return NextResponse.json({
        success: true,
        message: "Comment Posted Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Comment not posted",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}
