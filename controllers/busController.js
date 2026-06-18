const Bus =
    require("../models/Bus");


// =====================================
// CREATE BUS
// =====================================

exports.createBus = async (req, res) => {

    try {


        const bus =
            await Bus.create(req.body);


        res.status(201).json({

            success: true,

            message:
                "Bus Created Successfully",

            data: bus

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};



// =====================================
// GET ALL BUSES
// =====================================


exports.getBuses = async (req, res) => {

    try {


        const buses =
            await Bus.find()

                .populate(
                    "driverId",
                    "fullName phone"
                )

                .populate(
                    "routeId",
                    "routeName routeCode"
                )

                .sort({
                    createdAt: -1
                });



        res.status(200).json({

            success: true,

            count: buses.length,

            data: buses

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};



// =====================================
// GET SINGLE BUS
// =====================================


exports.getBus = async (req, res) => {


    try {


        const bus =
            await Bus.findById(
                req.params.id
            )


                .populate(
                    "driverId"
                )

                .populate(
                    "routeId"
                );



        if (!bus) {

            return res.status(404).json({

                success: false,

                message:
                    "Bus Not Found"

            });

        }



        res.status(200).json({

            success: true,

            data: bus

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};



// =====================================
// UPDATE BUS
// =====================================


exports.updateBus = async (req, res) => {


    try {


        const bus =
            await Bus.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            );



        if (!bus) {


            return res.status(404).json({

                success: false,

                message:
                    "Bus Not Found"

            });


        }



        res.status(200).json({

            success: true,

            message:
                "Bus Updated Successfully",

            data: bus

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};



// =====================================
// DELETE BUS
// =====================================


exports.deleteBus = async (req, res) => {


    try {


        const bus =
            await Bus.findByIdAndDelete(
                req.params.id
            );



        if (!bus) {


            return res.status(404).json({

                success: false,

                message:
                    "Bus Not Found"

            });

        }



        res.status(200).json({

            success: true,

            message:
                "Bus Deleted Successfully"

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};



// =====================================
// UPDATE BUS LOCATION
// =====================================


exports.updateBusLocation =
    async (req, res) => {


        try {


            const bus =
                await Bus.findByIdAndUpdate(

                    req.params.id,

                    {

                        lastLatitude:
                            req.body.latitude,


                        lastLongitude:
                            req.body.longitude,


                        speed:
                            req.body.speed,


                        lastUpdated:
                            new Date()

                    },

                    {
                        new: true
                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Location Updated",

                data: bus

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };



// =====================================
// UPDATE BUS STATUS
// =====================================


exports.updateBusStatus =
    async (req, res) => {


        try {


            const bus =
                await Bus.findByIdAndUpdate(

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

                data: bus

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };