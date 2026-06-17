const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(

    {

        // ====================
        // SCHOOL DETAILS
        // ====================

        schoolName: {

            type: String,

            required: true,

            trim: true

        },

        schoolNumber: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        phone: {

            type: String,

            required: true,

            trim: true

        },

        password: {

            type: String,

            required: true

        },

        board: {

            type: String,

            enum: [

                "CBSE",

                "ICSE",

                "STATE",

                "IB",

                "OTHER"

            ],

            required: true

        },

        address: {

            type: String,

            required: true,

            trim: true

        },

        city: {

            type: String,

            required: true,

            trim: true

        },

        state: {

            type: String,

            required: true,

            trim: true

        },

        pincode: {

            type: String,

            required: true,

            trim: true

        },

        // ====================
        // DOCUMENTS
        // ====================

        registrationCertificate: {

            type: String,

            default: ""

        },

        // ====================
        // PRINCIPAL DETAILS
        // ====================

        principalName: {

            type: String,

            required: true,

            trim: true

        },

        principalEmail: {

            type: String,

            required: true,

            lowercase: true,

            trim: true

        },

        principalPhone: {

            type: String,

            required: true,

            trim: true

        },

        principalAadhar: {

            type: String,

            default: ""

        },

        principalId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },

        // ====================
        // APPROVAL STATUS
        // ====================

        status: {

            type: String,

            enum: [

                "pending",

                "approved",

                "rejected",

                "suspended"

            ],

            default: "pending"

        },

        approvedBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },

        approvedAt: {

            type: Date,

            default: null

        },

        rejectionReason: {

            type: String,

            default: ""

        },

        // ====================
        // SUBSCRIPTION
        // ====================

        plan: {

            type: String,

            enum: [

                "trial",

                "basic",

                "premium",

                "enterprise"

            ],

            default: "trial"

        },

        planStartDate: {

            type: Date,

            default: Date.now

        },

        planExpireDate: {

            type: Date,

            default: null

        },

        isSubscriptionActive: {

            type: Boolean,

            default: true

        },

        // ====================
        // ACCOUNT STATUS
        // ====================

        isActive: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "School",
    schoolSchema
);