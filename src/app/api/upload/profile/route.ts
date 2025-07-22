import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export const dynamic = "force-dynamic"; // Use Node.js runtime

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "profile_pictures",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result); // Contains secure_url
        }
      );

      Readable.from(buffer).pipe(stream);
    });

    if (!result?.secure_url) {
      return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }

    //upload image to user profile.

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
