const Message =
    require("../models/Message");

const Conversation =
    require("../models/Conversation");

const users = {};

module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log(
            "Connected:",
            socket.id
        );

        // User Join
        socket.on(
            "join",
            (userId) => {

                users[userId] =
                    socket.id;

                console.log(
                    "Joined:",
                    userId
                );

            }
        );

        // Send Message
        socket.on(
            "sendMessage",
            async (data) => {

                try {

                    const newMessage =
                        await Message.create({

                            conversationId:
                                data.conversationId,

                            senderId:
                                data.senderId,

                            receiverId:
                                data.receiverId,

                            message:
                                data.message,

                            delivered: true

                        });

                    await Conversation.findByIdAndUpdate(

                        data.conversationId,

                        {

                            lastMessage:
                                data.message,

                            lastMessageAt:
                                new Date()

                        }

                    );

                    const receiverSocket =
                        users[
                        data.receiverId
                        ];

                    if (receiverSocket) {

                        io.to(receiverSocket)
                            .emit(
                                "receiveMessage",
                                newMessage
                            );

                    }

                    socket.emit(
                        "messageSent",
                        newMessage
                    );

                } catch (error) {

                    console.log(error);

                }

            }
        );

        // Read Message
        socket.on(
            "messageRead",
            async (messageId) => {

                await Message.findByIdAndUpdate(

                    messageId,

                    {

                        isRead: true

                    }

                );

            }
        );

        socket.on(
            "disconnect",
            () => {

                console.log(
                    "Disconnected"
                );

            }
        );

    });

};