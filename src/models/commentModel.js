import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Comment cannot be empty'],
    },
    // Self-referencing field for nested comments (replies).
    // If it's a top-level comment, this field will be null.
    replies:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default:[]
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true, })

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)
