const express =
    require("express");


const router =
    express.Router();



const {

    saveLocation,

    getLocations,

    getLatestLocation,

    getTrackingHistory,

    deleteLocation


} = require("../controllers/busLocationController");







// SAVE BUS GPS LOCATION

router.post(
    "/",
    saveLocation
);







// GET ALL LOCATIONS

router.get(
    "/",
    getLocations
);







// GET LATEST LOCATION OF BUS

router.get(
    "/latest/:busId",
    getLatestLocation
);







// GET BUS TRACKING HISTORY

router.get(
    "/history/:busId",
    getTrackingHistory
);







// DELETE LOCATION

router.delete(
    "/:id",
    deleteLocation
);







module.exports =
    router;