const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, "Invalid mobile number"], // Indian 10-digit
        },

        profession: {
            type: String,
            enum: ["Showroom", "Shop", "Job"],
            required: true,
        },

        mode: {
            type: String,
            enum: ["Part Time", "Full Time"],
            required: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
