const express =
    require("express");

const router =
    express.Router();

const {

    sendMessage,

    getMessages,

    getMessage,

    markAsRead,

    deleteMessage

} = require(
    "../controllers/messageController"
);


// SEND MESSAGE
router.post(
    "/",
    sendMessage
);


// GET ALL MESSAGES OF CONVERSATION
router.get(
    "/conversation/:conversationId",
    getMessages
);


// GET SINGLE MESSAGE
router.get(
    "/:id",
    getMessage
);


// MARK MESSAGE AS READ
router.put(
    "/read/:id",
    markAsRead
);


// DELETE MESSAGE
router.delete(
    "/:id",
    deleteMessage
);

module.exports =
    router;