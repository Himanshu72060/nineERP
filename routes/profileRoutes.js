const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    getMyProfile,

    updateProfile,

    changePassword

} = require("../controllers/profileController");


// GET PROFILE

router.get(
    "/me",
    auth,
    getMyProfile
);


// UPDATE PROFILE

router.put(
    "/update",
    auth,
    updateProfile
);


// CHANGE PASSWORD

router.put(
    "/change-password",
    auth,
    changePassword
);

module.exports =
    router;