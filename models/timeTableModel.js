const mongoose =
    require("mongoose");

const periodSchema =
    new mongoose.Schema({

        subject: {
            type: String,
            required: true
        },

        teacherId: {
            type: String
        },

        teacherName: {
            type: String
        },

        startTime: {
            type: String,
            required: true
        },

        endTime: {
            type: String,
            required: true
        },

        room: {
            type: String,
            required: true
        },

        isBreak: {
            type: Boolean,
            default: false
        }

    });

const timeTableSchema =
    new mongoose.Schema({

        classId: {
            type: String,
            required: true
        },

        className: {
            type: String,
            required: true
        },

        academicSession: {
            type: String,
            required: true
        },

        sessionType: {

            type: String,

            enum: [
                "Summer",
                "Winter"
            ],

            required: true

        },

        day: {

            type: String,

            enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],

            required: true

        },

        periods: [periodSchema]

    },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "TimeTable",
        timeTableSchema
    );