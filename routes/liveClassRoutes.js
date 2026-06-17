const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");

const upload =
    require("../middleware/uploadMiddleware");

const {

    createLiveClass,

    getLiveClasses,

    getLiveClass,

    updateLiveClass,

    deleteLiveClass,

    startLiveClass,

    endLiveClass

} =
    require("../controllers/liveClassController");



// =====================================
// CREATE LIVE CLASS
// =====================================

router.post(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    upload.single("image"),

    createLiveClass

);




// =====================================
// GET ALL LIVE CLASSES
// =====================================

router.get(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school",
        "student"
    ),

    getLiveClasses

);




// =====================================
// GET SINGLE LIVE CLASS
// =====================================

router.get(

    "/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school",
        "student"
    ),

    getLiveClass

);




// =====================================
// UPDATE LIVE CLASS
// =====================================

router.put(

    "/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    upload.single("image"),

    updateLiveClass

);




// =====================================
// DELETE LIVE CLASS
// =====================================

router.delete(

    "/:id",

    auth,

    role(
        "principal",
        "school"
    ),

    deleteLiveClass

);




// =====================================
// START LIVE CLASS
// =====================================

router.put(

    "/start/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    startLiveClass

);




// =====================================
// END LIVE CLASS
// =====================================

router.put(

    "/end/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    endLiveClass

);



module.exports =
    router;