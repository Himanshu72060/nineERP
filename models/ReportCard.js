const mongoose =
    require("mongoose");

const subjectSchema =
    new mongoose.Schema({

        subject: {
            type: String,
            required: true
        },

        marks: {
            type: Number,
            required: true
        },

        totalMarks: {
            type: Number,
            required: true
        },

        grade: {
            type: String,
            required: true
        }

    });

const reportCardSchema =
    new mongoose.Schema({

        studentId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        studentName: {
            type: String,
            required: true
        },

        rollNo: {
            type: String,
            required: true
        },

        className: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        session: {
            type: String,
            required: true
        },

        examType: {
            type: String,
            required: true
        },

        teacherName: {
            type: String,
            required: true
        },

        remarks: {
            type: String,
            default: ""
        },

        percentage: {
            type: Number,
            required: true
        },

        result: {

            type: String,

            enum: [
                "Pass",
                "Fail"
            ],

            default: "Pass"

        },

        subjects: [subjectSchema]

    },
        {
            timestamps: true
        });

module.exports =
    mongoose.model(
        "ReportCard",
        reportCardSchema
    );