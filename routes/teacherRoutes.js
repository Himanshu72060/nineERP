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

    createTeacher,

    teacherLogin,

    getAllTeachers,

    getTeacherById,

    deleteTeacher

} = require("../controllers/teacherController");


// Principal

router.post(
    "/create",
    auth,
    role("principal"),
    upload.single("teacherImage"),
    createTeacher
);


// Public

router.post(
    "/login",
    teacherLogin
);


// Principal

router.get(
    "/",
    auth,
    role("principal"),
    getAllTeachers
);

router.get(
    "/:id",
    auth,
    role("principal"),
    getTeacherById
);

router.delete(
    "/:id",
    auth,
    role("principal"),
    deleteTeacher
);

module.exports =
    router;