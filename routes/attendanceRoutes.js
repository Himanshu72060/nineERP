const express =
    require("express");


const router =
    express.Router();


const auth =
    require("../middleware/authMiddleware");


const role =
    require("../middleware/roleMiddleware");


const {


    createAttendance,

    getAttendances,

    getAttendance,

    updateAttendance,

    deleteAttendance,

    studentExit


} =
    require("../controllers/attendanceController");




// CREATE

router.post(

    "/",

    auth,

    role(
        "teacher",
        "principal"
    ),

    createAttendance

);




// GET ALL

router.get(

    "/",

    auth,

    role(
        "teacher",
        "principal",
        "school"
    ),

    getAttendances

);




// GET ONE

router.get(

    "/:id",

    auth,

    role(
        "teacher",
        "principal"
    ),

    getAttendance

);




// UPDATE

router.put(

    "/:id",

    auth,

    role(
        "teacher",
        "principal"
    ),

    updateAttendance

);




// DELETE

router.delete(

    "/:id",

    auth,

    role(
        "principal"
    ),

    deleteAttendance

);




// STUDENT EXIT

router.put(

    "/exit/:id",

    auth,

    role(
        "teacher",
        "principal"
    ),

    studentExit

);



module.exports =
    router;