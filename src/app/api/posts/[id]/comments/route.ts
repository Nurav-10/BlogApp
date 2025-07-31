import { NextResponse,NextRequest } from "next/server";
import db from "@/dbconfig/dbconfig";
import { Comment } from "@/models/commentModel";


export async function GET(request:Request,
  context: { params:Promise<{ id: string }> }) {
  await db();
  const { id } = await context.params;
  
  try {
    //Get All Comments for a Post
    const flatComments = await Comment.find({ post: id })
      .populate("author", "username _id email profilePicture")
      .populate({
        path:'replies',
        populate:{path:'author',select:'username profilePicture'},
      })
    if (flatComments.length)
      return NextResponse.json({
        success: true,
        message: "Comment Fetched Successfully",
        data:flatComments
      });
    return NextResponse.json({
      success: true,
      status: 201,
      message: "Be the first one to comment",
      data:[]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}



export async function POST(
  request: NextRequest,
  context: { params:Promise<{ id: string }> }
) {
  await db();
  const { id } = await context.params;
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
