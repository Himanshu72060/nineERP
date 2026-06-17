const express =
    require("express");


const router =
    express.Router();


const auth =
    require("../middleware/authMiddleware");


const role =
    require("../middleware/roleMiddleware");


const {

    createFeeStructure,

    getFeeStructures,

    getFeeStructure,

    updateFeeStructure,

    deleteFeeStructure


} =
    require("../controllers/feeStructureController");




// =====================================
// CREATE FEE STRUCTURE
// =====================================

router.post(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    createFeeStructure

);




// =====================================
// GET ALL FEE STRUCTURES
// =====================================

router.get(

    "/",

    auth,

    role(
        "school",
        "principal"
    ),

    getFeeStructures

);




// =====================================
// GET SINGLE FEE STRUCTURE
// =====================================

router.get(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    getFeeStructure

);




// =====================================
// UPDATE FEE STRUCTURE
// =====================================

router.put(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    updateFeeStructure

);




// =====================================
// DELETE FEE STRUCTURE
// =====================================

router.delete(

    "/:id",

    auth,

    role(
        "school",
        "principal"
    ),

    deleteFeeStructure

);



module.exports =
    router;