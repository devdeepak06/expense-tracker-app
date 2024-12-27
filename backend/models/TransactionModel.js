import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Food", "Rent", "Shopping", "Transportation", "Health", "Other"], // Predefined categories
    },
    description: {
        type: String,
        trim: true,
    },
    transactionType: {
        type: String,
        required: [true, "Transaction Type is required"],
        enum: ["income", "expense"], // Only "income" or "expense"
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User collection
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Use Date.now directly for clarity
    },
});

// Index for performance on user and date fields
transactionSchema.index({ user: 1, date: -1 });

// Instance Method to Format Amount
transactionSchema.methods.formatAmount = function () {
    return `$${this.amount.toFixed(2)}`;
};

// Static Method to Get Transactions by User
transactionSchema.statics.getTransactionsByUser = async function (userId) {
    return this.find({ user: userId }).sort({ date: -1 });
};

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
