const express =
    require("express");

const router =
    express.Router();


const auth =
    require("../middleware/authMiddleware");


const role =
    require("../middleware/roleMiddleware");


const {

    createAdmission,

    getAdmissions,

    getAdmission,

    updateAdmission,

    deleteAdmission


} = require("../controllers/admissionController");





router.post(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    createAdmission

);




router.get(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    getAdmissions

);




router.get(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    getAdmission

);




router.put(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    updateAdmission

);




router.delete(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    deleteAdmission

);



module.exports =
    router;