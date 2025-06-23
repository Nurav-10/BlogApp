import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   images:{
      type:String,
   },
   published:{
      type:Boolean,
      default:true
   },
   category:{
      type:String,
      default:null
   }
}, {timestamps: true })

const Post=mongoose.models.Post || mongoose.model('Post',postSchema)
export default Post;