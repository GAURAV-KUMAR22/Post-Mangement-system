import mongoose from "mongoose";

export default function DbConnection() {
    mongoose.connect(process.env.MONGODB_URI).then((success) => console.log('Db connected Succussfully')).catch((error) => console.log(error.message));
};
