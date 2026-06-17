const Message =
    require("../models/Message");

const Conversation =
    require("../models/Conversation");


// SEND MESSAGE
exports.sendMessage =
    async (req, res) => {

        try {

            const {

                conversationId,

                senderId,

                receiverId,

                message

            } = req.body;

            if (!message) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Message is required"

                });

            }

            const newMessage =
                await Message.create({

                    conversationId,

                    senderId,

                    receiverId,

                    message,

                    delivered: true

                });

            await Conversation.findByIdAndUpdate(

                conversationId,

                {

                    lastMessage:
                        message,

                    lastMessageAt:
                        new Date()

                }

            );

            res.status(201).json({

                success: true,

                message:
                    "Message Sent Successfully",

                data:
                    newMessage

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// GET ALL MESSAGES
exports.getMessages =
    async (req, res) => {

        try {

            const messages =
                await Message.find({

                    conversationId:
                        req.params.conversationId

                })

                    .populate(
                        "senderId",
                        "fullName role"
                    )

                    .populate(
                        "receiverId",
                        "fullName role"
                    )

                    .sort({
                        createdAt: 1
                    });

            res.status(200).json({

                success: true,

                count:
                    messages.length,

                data:
                    messages

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// GET SINGLE MESSAGE
exports.getMessage =
    async (req, res) => {

        try {

            const message =
                await Message.findById(
                    req.params.id
                );

            if (!message) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Message Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    message

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// MARK AS READ
exports.markAsRead =
    async (req, res) => {

        try {

            const message =
                await Message.findByIdAndUpdate(

                    req.params.id,

                    {

                        isRead: true,

                        delivered: true

                    },

                    {

                        new: true

                    }

                );

            res.status(200).json({

                success: true,

                message:
                    "Message Read",

                data:
                    message

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// DELETE MESSAGE
exports.deleteMessage =
    async (req, res) => {

        try {

            const message =
                await Message.findByIdAndDelete(
                    req.params.id
                );

            if (!message) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Message Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Message Deleted Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };