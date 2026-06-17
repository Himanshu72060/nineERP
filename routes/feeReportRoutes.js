const express =
    require("express");


const router =
    express.Router();


const auth =
    require("../middleware/authMiddleware");


const role =
    require("../middleware/roleMiddleware");


const {

    createFeeReport,

    getFeeReports,

    getFeeReport,

    updateFeeReport,

    deleteFeeReport

} =
    require("../controllers/feeReportController");



// =====================================
// CREATE FEE REPORT
// =====================================

router.post(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    createFeeReport

);



// =====================================
// GET ALL FEE REPORTS
// =====================================

router.get(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    getFeeReports

);



// =====================================
// GET SINGLE FEE REPORT
// =====================================

router.get(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    getFeeReport

);



// =====================================
// UPDATE FEE REPORT
// =====================================

router.put(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    updateFeeReport

);



// =====================================
// DELETE FEE REPORT
// =====================================

router.delete(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    deleteFeeReport

);



module.exports =
    router;