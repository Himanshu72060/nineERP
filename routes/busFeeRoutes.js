const express =
    require("express");


const router =
    express.Router();



const {

    createBusFee,

    getBusFees,

    getBusFee,

    updateBusFee,

    deleteBusFee,

    getStudentBusFee,

    updatePaymentStatus


} = require("../controllers/busFeeController");







// CREATE BUS FEE

router.post(
    "/",
    createBusFee
);







// GET ALL FEES

router.get(
    "/",
    getBusFees
);







// GET SINGLE FEE

router.get(
    "/:id",
    getBusFee
);







// UPDATE FEE

router.put(
    "/:id",
    updateBusFee
);







// DELETE FEE

router.delete(
    "/:id",
    deleteBusFee
);







// STUDENT FEE HISTORY

router.get(
    "/student/:studentId",
    getStudentBusFee
);







// UPDATE PAYMENT STATUS

router.put(
    "/payment/:id",
    updatePaymentStatus
);







module.exports =
    router;