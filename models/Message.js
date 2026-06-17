const mongoose =
    require("mongoose");

const messageSchema =
    new mongoose.Schema({

        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        file: {
            type: String,
            default: ""
        },

        isRead: {
            type: Boolean,
            default: false
        },

        delivered: {
            type: Boolean,
            default: false
        }

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(

        "Message",

        messageSchema

    );