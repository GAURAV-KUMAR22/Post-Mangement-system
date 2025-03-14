import User from "../Model/Auth.model.js";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import crypto from 'crypto';
import mongoose from "mongoose";

async function RagisterUser(req, res, next) {
    try {
        const data = req.body;
        const { userName, email, password } = data;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'all fileds are required' })
        };

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already ragistered with email' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(202).json({ message: 'User Ragister succussfully', newUser })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function LoginUser(req, res, next) {
    try {
        const data = req.body;
        const { email, password } = data;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).send({ message: 'User Does not Exist please Ragister first' })
        };

        const Token = JWT.sign({ id: existingUser._id, email: email }, process.env.SECRET_KEY);
        const payload = { Token: Token, UserName: existingUser.userName, userId: existingUser._id }
        return res.status(200).send({ message: 'User Login Succussfully', payload });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}


async function ForgotPassword(req, res, next) {
    try {
        const data = req.body;
        const { email } = data;
        console.log(email)
        if (!email) {
            return res.status(400).json({ message: "All fields Are required" })
        };

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not Exist' })
        }

        if (existingUser.resetPasswordToken && existingUser.resetPasswordToken !== null) {
            return res.status(400).json({ message: 'you send email check this' })
        }
        const resetToken = crypto.randomBytes(32).toString('hex');

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpire = Date.now() + 3600000;


        // send email

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            port: 587,
            auth: {
                user: process.env.ADMINEMAIL,
                pass: process.env.ADMINPASSWORD
            }
        });
        const mailOption = {
            from: process.env.ADMINEMAIL,
            to: existingUser.email,
            subject: "Password Reset Request",
            text: `Click on the link to reset your password: ${process.env.FRONTEND_BASE_URL}/reset-password?token=${resetToken}`
        };

        await transporter.sendMail(mailOption);
        await User.updateOne({ _id: existingUser._id }, existingUser);
        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
};

async function ResetPassword(req, res, next) {
    try {
        const data = req.body;
        const existingToken = req.query.token;
        const { email, password } = data;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        };

        const existingUser = await User.findOne({ email: email });


        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        if (!existingToken) {
            return res.status(400).json({ message: 'token not exist' })
        }

        const matchToken = existingUser.resetPasswordToken === existingToken
        if (!matchToken) {
            return res.status(400).json({ message: 'token does not match try again' })
        }
        const token = JWT.sign({ id: existingUser._id, email: existingUser.email }, process.env.SECRET_KEY);

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ _id: existingUser._id }, { $set: { password: hashedPassword, resetPasswordExpire: null, resetPasswordToken: null } })

        res.status(200).send({ message: "reseting succesfully you are redirect to /Login", existingUser, token })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
};

async function Logout(req, res, next) {
    try {
        const User = await req.user;
        if (!User) {
            return res.status(400).json({ message: 'did not found user' })
        }
        if (User) {
            req.user = null
        }
        return res.status(200).json({ message: 'user successfullt Logout' })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

};

async function UpdateProfile(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const profileImage = req.file;
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id Does not exist" })
    }
    const loginUser = await User.findOne({ _id: id })

    if (!loginUser) {
        return res.status(400).json({ message: "User Does not exist" })
    };

    const updateduser = await User.findByIdAndUpdate(id, { profileImage: profileImage.filename }, { new: true })
    if (!updateduser) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send({ message: "Profile-picture successfully updated" })

};
async function getUser(req, res, next) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(userId).select("-password -resetPasswordToken");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userObject = user.toObject();

        delete userObject.password;
        delete userObject.resetPasswordToken;

        return res.status(200).json({ user: userObject });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const controller = {
    RagisterUser,
    LoginUser,
    ForgotPassword,
    ResetPassword,
    Logout,
    UpdateProfile,
    getUser
}

export default controller;