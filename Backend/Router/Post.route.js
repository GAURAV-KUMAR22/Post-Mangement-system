import express from 'express'
import controller from '../Controller/Posts.controller.js';
import multer from "multer";
const route = express.Router();



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get('/posts', controller.getPost)
route.post('/post', upload.single('image'), controller.postPost)
route.delete('/posts')
export default route;