const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");

const {

    createReportCard,

    getReportCards,

    getReportCard,

    updateReportCard,

    deleteReportCard,

    getStudentReportCards

} = require(
    "../controllers/reportCardController"
);


// =====================================
// CREATE REPORT CARD
// =====================================

router.post(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    createReportCard

);


// =====================================
// GET ALL REPORT CARDS
// =====================================

router.get(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    getReportCards

);


// =====================================
// GET REPORT CARDS BY STUDENT
// =====================================

router.get(

    "/student/:studentId",

    auth,

    role(
        "teacher",
        "principal",
        "school",
        "student"
    ),

    getStudentReportCards

);


// =====================================
// GET SINGLE REPORT CARD
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

    getReportCard

);


// =====================================
// UPDATE REPORT CARD
// =====================================

router.put(

    "/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    updateReportCard

);


// =====================================
// DELETE REPORT CARD
// =====================================

router.delete(

    "/:id",

    auth,

    role(
        "principal",
        "school"
    ),

    deleteReportCard

);

module.exports =
    router;