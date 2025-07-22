'use server'
import db from "@/dbconfig/dbconfig";
import User from "@/models/userModel";

export async function UploadImage(email:string,imageUrl:string){

   await db()
  const user=await User.updateOne({ email }, { $set: { profilePicture: imageUrl } });
  if(user){
  return {
    success:true,
    message:'Profile picture updated'
  }
  }
  else{
   return {success:false,message:'Image Cannot be Uploaded'}
  }
}