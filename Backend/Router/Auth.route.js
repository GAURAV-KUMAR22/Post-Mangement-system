
import express from 'express';
import controller from '../Controller/Auth.controller.js';
import AuthenticationCheck from '../Services/Auth.middleware.js';
import upload from '../Services/Multer.js';
const route = express.Router();


route.post('/ragister', controller.RagisterUser);
route.post('/login', controller.LoginUser);
route.post('/forgot-password', AuthenticationCheck, controller.ForgotPassword);
route.post('/reset-password/?', AuthenticationCheck, controller.ResetPassword);
route.get('/logout', AuthenticationCheck, controller.Logout);
route.get('/profile/:id', AuthenticationCheck, controller.getUser)
route.put('/profile/update/:id', upload.single('profileImage'), AuthenticationCheck, controller.UpdateProfile);

export default route;