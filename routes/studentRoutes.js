const express =
    require("express");

const router =
    express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");

const {

    createStudent,

    studentLogin,

    getAllStudents,

    getStudentById,

    updateStudent,

    deleteStudent

} = require("../controllers/studentController");


// =====================================
// PUBLIC
// =====================================

router.post(
    "/login",
    studentLogin
);


// =====================================
// PRINCIPAL ONLY
// =====================================

// CREATE STUDENT

router.post(
    "/create",
    auth,
    role("principal"),
    createStudent
);


// GET ALL STUDENTS

router.get(
    "/",
    auth,
    role("principal"),
    getAllStudents
);


// GET STUDENT BY ID

router.get(
    "/:id",
    auth,
    role("principal"),
    getStudentById
);


// UPDATE STUDENT

router.put(
    "/:id",
    auth,
    role("principal"),
    updateStudent
);


// DELETE STUDENT

router.delete(
    "/:id",
    auth,
    role("principal"),
    deleteStudent
);

module.exports =
    router;