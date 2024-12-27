import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Invalid email format"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction", // References the Transaction model
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save middleware to hash passwords
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password hasn't changed
    this.password = await bcrypt.hash(this.password, 10); // Hash with a salt of 10 rounds
    next();
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Error handling for unique constraint on email
userSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new Error("Email already exists"));
    } else {
        next(error);
    }
});

// Index for email for faster lookup
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
