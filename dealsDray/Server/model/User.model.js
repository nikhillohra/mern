import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Please provide a mobile number"],
        unique: [true, "Mobile number already exists"],
    },
    designation: {
        type: String,
        enum: ["HR", "Manager", "Sales", "IT"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    courses: {
        type: [String],
        enum: ["MCA", "BCA", "BSC", "B.Tech"],
    },
    profile: {
        type: String,
    },
});

export default mongoose.models.Users || mongoose.model('User', UserSchema);
