
import express from 'express';
import controller from '../Controller/Auth.controller.js';
import AuthenticationCheck from '../Services/Auth.middleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const route = express.Router();
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");

// ✅ Ensure upload directory exists before storing files
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })


route.post('/ragister', controller.RagisterUser);
route.post('/login', controller.LoginUser);
route.post('/forgot-password', AuthenticationCheck, controller.ForgotPassword);
route.post('/reset-password/?', AuthenticationCheck, controller.ResetPassword);
route.get('/logout', AuthenticationCheck, controller.Logout);
route.get('/profile/:id', AuthenticationCheck, controller.getUser)
route.put('/profile/update/:id', upload.single('profileImage'), AuthenticationCheck, controller.UpdateProfile);
route.get('/uploads', AuthenticationCheck, controller.getStaticfile);

export default route;