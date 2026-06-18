const Driver =
    require("../models/Driver");


// =====================================
// CREATE DRIVER
// =====================================

exports.createDriver = async (req, res) => {

    try {


        const driver =
            await Driver.create(
                req.body
            );


        res.status(201).json({

            success: true,

            message:
                "Driver Created Successfully",

            data: driver

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};




// =====================================
// GET ALL DRIVERS
// =====================================

exports.getDrivers = async (req, res) => {

    try {


        const drivers =
            await Driver.find()


                .populate(
                    "userId",
                    "fullName phone email"
                )


                .populate(
                    "assignedBus",
                    "busNumber busName"
                )


                .sort({

                    createdAt: -1

                });



        res.status(200).json({

            success: true,

            count:
                drivers.length,

            data: drivers

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};




// =====================================
// GET SINGLE DRIVER
// =====================================

exports.getDriver =
    async (req, res) => {


        try {


            const driver =
                await Driver.findById(
                    req.params.id
                )


                    .populate(
                        "userId"
                    )


                    .populate(
                        "assignedBus"
                    );



            if (!driver) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Driver Not Found"

                });


            }



            res.status(200).json({

                success: true,

                data: driver

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// UPDATE DRIVER
// =====================================

exports.updateDriver =
    async (req, res) => {


        try {


            const driver =
                await Driver.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );



            if (!driver) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Driver Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Driver Updated Successfully",

                data: driver

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// DELETE DRIVER
// =====================================


exports.deleteDriver =
    async (req, res) => {


        try {


            const driver =
                await Driver.findByIdAndDelete(

                    req.params.id

                );



            if (!driver) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Driver Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Driver Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// ASSIGN BUS TO DRIVER
// =====================================


exports.assignBus =
    async (req, res) => {


        try {


            const driver =
                await Driver.findByIdAndUpdate(

                    req.params.id,

                    {

                        assignedBus:
                            req.body.busId

                    },

                    {
                        new: true
                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Bus Assigned To Driver",

                data: driver

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };





// =====================================
// UPDATE DRIVER STATUS
// =====================================


exports.updateDriverStatus =
    async (req, res) => {


        try {


            const driver =
                await Driver.findByIdAndUpdate(

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
                    "Driver Status Updated",

                data: driver

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };