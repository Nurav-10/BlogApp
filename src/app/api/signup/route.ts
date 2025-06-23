import db from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt, { genSalt } from "bcryptjs";
import { NextResponse } from "next/server";
import { success } from "zod/v4";

export async function POST(req: Request) {
  await db();
  try {
    const { email, username, password } = await req.json();
    //check if user exist already.
    if(!email || !username || !password)
      return NextResponse.json({success:false,message:'Please provide all field'})

    const user = await User.findOne({ email, username });
    if (user)
      return NextResponse.json({
        success: false,
        message: "User Already Exists",
      });

    //if not exist hash the password.
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //now save the user.
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser)
      return NextResponse.json({
        success: true,
        message: "User created successfully",
      });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
