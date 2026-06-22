const express =
    require("express");


const router =
    express.Router();



const {

    markBoarding,

    markDrop,

    getAttendance,

    getStudentAttendance,

    getBusAttendance,

    getAttendanceByDate,

    deleteAttendance


} = require("../controllers/busAttendanceController");






// MARK STUDENT BOARDING

router.post(
    "/boarding",
    markBoarding
);






// MARK STUDENT DROP

router.put(
    "/drop/:id",
    markDrop
);






// GET ALL ATTENDANCE

router.get(
    "/",
    getAttendance
);






// GET STUDENT ATTENDANCE

router.get(
    "/student/:studentId",
    getStudentAttendance
);






// GET BUS ATTENDANCE

router.get(
    "/bus/:busId",
    getBusAttendance
);






// GET ATTENDANCE BY DATE

router.get(
    "/date/:date",
    getAttendanceByDate
);






// DELETE ATTENDANCE

router.delete(
    "/:id",
    deleteAttendance
);







module.exports =
    router;