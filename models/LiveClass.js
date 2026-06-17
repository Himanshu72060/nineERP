const mongoose =
    require("mongoose");

const liveClassSchema =
    new mongoose.Schema(
        {

            subject: {
                type: String,
                required: true
            },

            teacher: {
                type: String,
                required: true
            },

            time: {
                type: String,
                required: true
            },

            image: {
                type: String,
                default: ""
            },

            students: {
                type: Number,
                default: 0
            },

            isLive: {
                type: Boolean,
                default: false
            },

            isTeacher: {
                type: Boolean,
                default: true
            },

            isSaved: {
                type: Boolean,
                default: false
            },

            liveId: {
                type: String,
                required: true,
                unique: true
            }

        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "LiveClass",
        liveClassSchema
    );