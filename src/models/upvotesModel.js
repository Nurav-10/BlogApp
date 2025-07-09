import mongoose from 'mongoose'

const upvotesSchema=new mongoose.Schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   postId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
   }
},{timestamps:true})

upvotesSchema.index({userId:1,postId:1},{unique:true})

const Upvotes=mongoose.models.Upvotes || mongoose.model('Upvotes',upvotesSchema)

export default Upvotes