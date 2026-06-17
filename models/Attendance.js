const mongoose =
    require("mongoose");

const attendanceSchema =
    new mongoose.Schema({

        studentId: {
            type: String,
            required: true
        },

        studentName: {
            type: String,
            required: true
        },

        className: {
            type: String,
            required: true
        },

        teacherName: {
            type: String,
            required: true
        },

        qrData: {
            type: String,
            default: ""
        },

        entryTime: {
            type: String,
            default: ""
        },

        exitTime: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Present",
                "Absent",
                "Late"
            ],
            default: "Present"
        },

        isInsideCampus: {
            type: Boolean,
            default: false
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Attendance",
        attendanceSchema
    );