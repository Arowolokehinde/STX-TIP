import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    wallet: {
        type: String,
        required: [true, "Please provide your wallet Address"],
        unique: true,
        lowercase: true,
    },

    isverified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
