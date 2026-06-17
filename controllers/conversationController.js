const Conversation =
    require("../models/Conversation");


// CREATE CONVERSATION
exports.createConversation =
    async (req, res) => {

        try {

            const {
                senderId,
                receiverId
            } = req.body;

            const existingConversation =
                await Conversation.findOne({

                    members: {
                        $all: [
                            senderId,
                            receiverId
                        ]
                    }

                });

            if (existingConversation) {

                return res.status(200).json({

                    success: true,

                    message:
                        "Conversation already exists",

                    data:
                        existingConversation

                });

            }

            const conversation =
                await Conversation.create({

                    members: [
                        senderId,
                        receiverId
                    ]

                });

            res.status(201).json({

                success: true,

                message:
                    "Conversation Created Successfully",

                data:
                    conversation

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// GET USER CONVERSATIONS
exports.getConversations =
    async (req, res) => {

        try {

            const conversations =
                await Conversation.find({

                    members:
                        req.params.userId

                })

                    .populate(
                        "members",
                        "fullName email role"
                    )

                    .sort({
                        lastMessageAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    conversations.length,

                data:
                    conversations

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// GET SINGLE CONVERSATION
exports.getConversation =
    async (req, res) => {

        try {

            const conversation =
                await Conversation.findById(
                    req.params.id
                )

                    .populate(
                        "members",
                        "fullName email role"
                    );

            if (!conversation) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Conversation Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    conversation

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };


// DELETE CONVERSATION
exports.deleteConversation =
    async (req, res) => {

        try {

            const conversation =
                await Conversation.findByIdAndDelete(
                    req.params.id
                );

            if (!conversation) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Conversation Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Conversation Deleted Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };