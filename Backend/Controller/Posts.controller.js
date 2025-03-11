import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp';
import crypto from 'crypto';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Posts from '../Model/post.model.js'
import User from '../Model/Auth.model.js';
import upload from '../Services/Multer.js';

async function newPost(req, res, next) {
    try {
        const postData = req.body;
        const postImage = req.file;
        const userid = req.user.id;

        if (!postData || !postImage || !userid) {
            return res.status(400).json({ message: 'All fields are required' })
        };

        const existingUser = await User.findById({ _id: userid });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not found" })
        };

        const postimagepath = await sharp(req.file.buffer)
            .jpeg({ quality: 80 }) // Convert to JPEG
            .toFile('../uploads');

        const post = new Posts({
            title: postData.title,
            imagename: `http://localhost:5000/uploads/${postImage.filename}`,
            content: postData.caption
        });
        await post.save();
        return res.status(200).json({ message: 'posted', post })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function getAllPost(req, res, next) {
    try {
        const posts = await Posts.find({}).limit(10);

        if (!posts) {
            return res.status(400).json({ message: 'post not found' })
        }

        return res.status(200).json({ posts: posts })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
}

const getPost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'user does not exist' })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
}

const controller = {
    getAllPost,
    newPost,
    getPost
}

export default controller;