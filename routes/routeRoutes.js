const express =
    require("express");


const router =
    express.Router();



const {

    createRoute,

    getRoutes,

    getRoute,

    updateRoute,

    deleteRoute,

    assignBus,

    updateRouteStatus


} = require("../controllers/routeController");





// CREATE ROUTE

router.post(
    "/",
    createRoute
);




// GET ALL ROUTES

router.get(
    "/",
    getRoutes
);




// GET SINGLE ROUTE

router.get(
    "/:id",
    getRoute
);




// UPDATE ROUTE

router.put(
    "/:id",
    updateRoute
);




// DELETE ROUTE

router.delete(
    "/:id",
    deleteRoute
);




// ASSIGN BUS TO ROUTE

router.put(
    "/assign-bus/:id",
    assignBus
);




// UPDATE ROUTE STATUS

router.put(
    "/status/:id",
    updateRouteStatus
);





module.exports =
    router;