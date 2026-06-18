const express =
    require("express");


const router =
    express.Router();



const {

    createDriver,

    getDrivers,

    getDriver,

    updateDriver,

    deleteDriver,

    assignBus,

    updateDriverStatus


} = require("../controllers/driverController");





// CREATE DRIVER

router.post(
    "/",
    createDriver
);





// GET ALL DRIVERS

router.get(
    "/",
    getDrivers
);





// GET SINGLE DRIVER

router.get(
    "/:id",
    getDriver
);





// UPDATE DRIVER

router.put(
    "/:id",
    updateDriver
);





// DELETE DRIVER

router.delete(
    "/:id",
    deleteDriver
);





// ASSIGN BUS TO DRIVER

router.put(
    "/assign-bus/:id",
    assignBus
);





// UPDATE DRIVER STATUS

router.put(
    "/status/:id",
    updateDriverStatus
);






module.exports =
    router;