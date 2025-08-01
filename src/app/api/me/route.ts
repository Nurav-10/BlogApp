import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

export async function GET(req:Request){
   try{
      const cookieStore=await cookies()
      const token=cookieStore.get('token')?.value

      if(!token){
         return NextResponse.json({
            success:false,
            message:'No Token Found',
            user:null
         })
      }

      //verify token.
      const decoded=await jwt.verify(token,process.env.JWT_SECRET!)

      return NextResponse.json({
         success:true,
         message:'User fetched successfully',
         user:decoded
      })
   }
   catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token", user: null },
      { status: 401 }
    );
  }
}