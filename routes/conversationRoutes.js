const express =
    require("express");

const router =
    express.Router();

const {

    createConversation,

    getConversations,

    getConversation,

    deleteConversation

} = require(
    "../controllers/conversationController"
);


// CREATE CONVERSATION
router.post(
    "/",
    createConversation
);


// GET USER CONVERSATIONS
router.get(
    "/user/:userId",
    getConversations
);


// GET SINGLE CONVERSATION
router.get(
    "/:id",
    getConversation
);


// DELETE CONVERSATION
router.delete(
    "/:id",
    deleteConversation
);

module.exports =
    router;