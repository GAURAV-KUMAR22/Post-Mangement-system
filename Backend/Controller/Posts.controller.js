import { PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp';
import crypto from 'crypto';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Posts from '../Model/post.model.js'

async function postPost(req, res, next) {

    const inputBuffer = req.file.buffer;
    try {

        const s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION || "eu-north-1",
        });

        const buffer = await sharp(inputBuffer).resize({
            width: 200,
            height: 100,
        }).toBuffer();


        const randomImag = crypto.randomBytes(2).toString('hex');
        const randomImageName = `${req.file.originalname}_${randomImag}`

        const params = ({
            "Bucket": process.env.BUCKET_NAME,
            "Key": randomImageName,
            "Body": buffer,
            "ContentType": req.file.mimetype,
        });
        const command = new PutObjectCommand(params);
        if (buffer) {
            const newPost = new Posts({
                title: req.file.originalname,
                imagename: randomImageName,
                content: req.body.caption,
            });
            await s3.send(command);
            const data = await newPost.save();
            res.status(200).json({ data: data })
        }

    } catch (error) {
        return console.log(error)
    }
}

async function getPost(req, res, next) {
    let postArray = [];
    try {
        const s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY,
                secretAccessKey: process.env.SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION || "eu-north-1",
        });
        const posts = await Posts.find();
        for (const post of posts) {
            const getObjectParams = {
                "Bucket": process.env.BUCKET_NAME,
                "Key": post.imagename
            };
            const command = new GetObjectCommand(getObjectParams);

            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            const postData = {
                postId: post.id,
                postTitle: post.title,
                postImage: post.imagename,
                postcontent: post.content,
                postTime: post.createdAt,
                postUrl: url
            }

            postArray.push(postData)
        }
        return res.status(200).json({ data: postArray })
    } catch (error) {
        console.log(error)
    }
}

const controller = {
    postPost,
    getPost,
    // prisma
}

export default controller;