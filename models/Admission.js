const mongoose = require("mongoose");

const admissionSchema =
    new mongoose.Schema(
        {
            schoolId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "School",

                required: true

            },

            studentName: {
                type: String,
                required: true
            },

            fatherName: {
                type: String,
                required: true
            },

            motherName: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            address: {
                type: String,
                required: true
            },

            studentClass: {
                type: String,
                required: true
            },

            gender: {
                type: String,
                enum: [
                    "Male",
                    "Female",
                    "Other"
                ],
                required: true
            },

            dob: {
                type: String,
                required: true
            },

            previousSchool: {
                type: String,
                default: ""
            },

            admissionDate: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "Admission",
        admissionSchema
    );

