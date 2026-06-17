const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");

const {

    createTimeTable,

    getTimeTables,

    getTimeTable,

    getClassTimeTable,

    updateTimeTable,

    deleteTimeTable

} = require(
    "../controllers/timeTableController"
);


// =====================================
// CREATE TIMETABLE
// =====================================

router.post(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    createTimeTable

);


// =====================================
// GET ALL TIMETABLES
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

    getTimeTables

);


// =====================================
// GET TIMETABLE BY CLASS ID
// =====================================

router.get(

    "/class/:classId",

    auth,

    role(
        "teacher",
        "principal",
        "school",
        "student"
    ),

    getClassTimeTable

);


// =====================================
// GET SINGLE TIMETABLE
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

    getTimeTable

);


// =====================================
// UPDATE TIMETABLE
// =====================================

router.put(

    "/:id",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    updateTimeTable

);


// =====================================
// DELETE TIMETABLE
// =====================================

router.delete(

    "/:id",

    auth,

    role(
        "principal",
        "school"
    ),

    deleteTimeTable

);

module.exports =
    router;