const Route =
    require("../models/Route");


// =====================================
// CREATE ROUTE
// =====================================

exports.createRoute = async (req, res) => {

    try {


        const route =
            await Route.create(
                req.body
            );


        res.status(201).json({

            success: true,

            message:
                "Route Created Successfully",

            data: route

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};




// =====================================
// GET ALL ROUTES
// =====================================

exports.getRoutes = async (req, res) => {


    try {


        const routes =
            await Route.find()


                .populate(
                    "busId",
                    "busNumber busName"
                )


                .sort({

                    createdAt: -1

                });



        res.status(200).json({

            success: true,

            count:
                routes.length,

            data: routes

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};




// =====================================
// GET SINGLE ROUTE
// =====================================


exports.getRoute =
    async (req, res) => {


        try {


            const route =
                await Route.findById(
                    req.params.id
                )


                    .populate(
                        "busId"
                    );



            if (!route) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Route Not Found"

                });


            }



            res.status(200).json({

                success: true,

                data: route

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// UPDATE ROUTE
// =====================================


exports.updateRoute =
    async (req, res) => {


        try {


            const route =
                await Route.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );



            if (!route) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Route Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Route Updated Successfully",

                data: route

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// DELETE ROUTE
// =====================================


exports.deleteRoute =
    async (req, res) => {


        try {


            const route =
                await Route.findByIdAndDelete(

                    req.params.id

                );



            if (!route) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Route Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Route Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// ASSIGN BUS TO ROUTE
// =====================================


exports.assignBus =
    async (req, res) => {


        try {


            const route =
                await Route.findByIdAndUpdate(

                    req.params.id,

                    {

                        busId:
                            req.body.busId

                    },

                    {
                        new: true
                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Bus Assigned To Route",

                data: route

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// =====================================
// UPDATE ROUTE STATUS
// =====================================


exports.updateRouteStatus =
    async (req, res) => {


        try {


            const route =
                await Route.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            req.body.status

                    },

                    {
                        new: true
                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Status Updated",

                data: route

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };