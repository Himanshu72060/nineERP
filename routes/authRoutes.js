const express = require("express");

const router = express.Router();

const {

    superAdminSignup,

    superAdminLogin,

    schoolSignup,

    schoolLogin,

    principalLogin

} = require("../controllers/authController");


// =====================================
// SUPER ADMIN
// =====================================

router.post(
    "/superadmin/signup",
    superAdminSignup
);

router.post(
    "/superadmin/login",
    superAdminLogin
);


// =====================================
// SCHOOL
// =====================================

router.post(
    "/school/signup",
    schoolSignup
);

router.post(
    "/school/login",
    schoolLogin
);


// =====================================
// PRINCIPAL
// =====================================

router.post(
    "/principal/login",
    principalLogin
);


module.exports = router;