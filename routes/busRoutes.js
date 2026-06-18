const express =
    require("express");

const router =
    express.Router();


const {

    createBus,

    getBuses,

    getBus,

    updateBus,

    deleteBus,

    updateBusLocation,

    updateBusStatus


} = require("../controllers/busController");





// CREATE BUS
router.post(
    "/",
    createBus
);



// GET ALL BUS
router.get(
    "/",
    getBuses
);



// GET SINGLE BUS
router.get(
    "/:id",
    getBus
);



// UPDATE BUS
router.put(
    "/:id",
    updateBus
);



// DELETE BUS
router.delete(
    "/:id",
    deleteBus
);



// UPDATE BUS LOCATION
router.put(
    "/location/:id",
    updateBusLocation
);



// UPDATE BUS STATUS
router.put(
    "/status/:id",
    updateBusStatus
);



module.exports =
    router;