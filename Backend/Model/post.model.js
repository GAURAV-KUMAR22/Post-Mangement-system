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

}, { timestamps: true })

const Posts = mongoose.model('PostSchema', PostSchema);
export default Posts;