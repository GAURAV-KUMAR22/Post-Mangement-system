import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imagename: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comment: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]

}, { timestamps: true })

const Posts = mongoose.model('PostSchema', PostSchema);
export default Posts;