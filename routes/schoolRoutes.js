const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const role =
    require("../middleware/roleMiddleware");
    

const {

    getAllSchools,
    getSchoolById,
    approveSchool,
    rejectSchool,
    suspendSchool

} = require("../controllers/schoolController");


// SUPER ADMIN ONLY



router.get(
    "/",
    auth,
    role("superadmin"),
    getAllSchools
);

router.get(
    "/:id",
    auth,
    role("superadmin"),
    getSchoolById
);

router.put(
    "/approve/:id",
    auth,
    role("superadmin"),
    approveSchool
);

router.put(
    "/reject/:id",
    auth,
    role("superadmin"),
    rejectSchool
);

router.put(
    "/suspend/:id",
    auth,
    role("superadmin"),
    suspendSchool
);



module.exports = router;