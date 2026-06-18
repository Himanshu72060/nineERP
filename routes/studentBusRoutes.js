const express =
    require("express");


const router =
    express.Router();



const {

    assignStudentBus,

    getStudentBus,

    getStudentBusById,

    updateStudentBus,

    deleteStudentBus,

    getStudentsByBus,

    getBusByStudent


} = require("../controllers/studentBusController");





// ASSIGN STUDENT TO BUS

router.post(
    "/",
    assignStudentBus
);





// GET ALL STUDENT BUS

router.get(
    "/",
    getStudentBus
);





// GET SINGLE RECORD

router.get(
    "/:id",
    getStudentBusById
);





// UPDATE ASSIGNMENT

router.put(
    "/:id",
    updateStudentBus
);





// DELETE ASSIGNMENT

router.delete(
    "/:id",
    deleteStudentBus
);





// GET STUDENTS BY BUS

router.get(
    "/bus/:busId",
    getStudentsByBus
);





// GET BUS BY STUDENT

router.get(
    "/student/:studentId",
    getBusByStudent
);






module.exports =
    router;