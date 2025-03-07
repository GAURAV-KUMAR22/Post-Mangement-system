import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    }
    ,
    createdAt: {
        type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });

const User = mongoose.model('UserSchema', UserSchema);

export default User;
