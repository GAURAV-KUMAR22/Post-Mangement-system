import express from 'express'
const route = express.Router();
import controller from '../Controller/Posts.controller.js';
import upload from '../Services/Multer.js';
import AuthenticationCheck from '../Services/Auth.middleware.js';
import convertToJpeg from '../Utils/ImageConverter.js';



route.get('/posts', AuthenticationCheck, controller.getAllPost)
route.post('/new-post', AuthenticationCheck, upload.single('image'), convertToJpeg, controller.newPost)
route.get('/post', AuthenticationCheck, controller.getPost)
export default route;