const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {

        schoolId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "School",

            default: null

        },

        role: {

            type: String,

            enum: [

                "superadmin",

                "school",

                "principal",

                "teacher",

                "student"

            ],

            required: true

        },

        fullName: {

            type: String,

            required: true,

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

        // ===================
        // SCHOOL
        // ===================

        schoolName: {

            type: String,

            default: null,

            trim: true

        },

        

        // ===================
        // STUDENT
        // ===================

        studentId: {

            type: String,

            unique: true,

            sparse: true

        },

        rollNumber: {

            type: String,

            default: null

        },

        className: {

            type: String,

            default: null

        },

        section: {

            type: String,

            default: null

        },

        parentName: {

            type: String,

            default: null

        },

        admissionNumber: {

            type: String,

            default: null

        },
        isOnline: {
            type: Boolean,
            default: false
        },

        lastSeen: {
            type: Date
        },

        // ===================
        // TEACHER
        // ===================

        teacherId: {

            type: String,

            unique: true,

            sparse: true

        },

        department: {

            type: String,

            default: null

        },

        specialization: {

            type: String,

            default: null

        },

        experienceYear: {

            type: Number,

            default: 0

        },

        teacherImage: {

            type: String,

            default: ""

        },

        faceVerified: {

            type: Boolean,

            default: false

        },
        

        // ===================
        // PRINCIPAL
        // ===================

        principalId: {

            type: String,

            unique: true,

            sparse: true

        },

        // ===================
        // ACCOUNT STATUS
        // ===================

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

        isActive: {

            type: Boolean,

            default: true

        },

        lastLogin: {

            type: Date,

            default: null

        }

    },
    

    {

        timestamps: true

    }

);

module.exports =
    mongoose.model(
        "User",
        userSchema
    );