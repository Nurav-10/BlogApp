import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
   username:{
      type:String,
      required:true,
      unique:true,
   },
   email:{
      type:String,
      required:true,
      unique:true,
   },
   password:{
      type:String,
      required:true,
   },
   profilePicture:{
      type:String
   },
   createdAt:{
      type:Date,
      default:Date.now
   },
})
const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User