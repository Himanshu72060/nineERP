const BusLocation =
    require("../models/BusLocation");

const Bus =
    require("../models/Bus");



// =====================================
// SAVE BUS LOCATION
// =====================================

exports.saveLocation =
    async (req, res) => {

        try {


            const {

                busId,

                latitude,

                longitude,

                speed,

                heading,

                accuracy,

                altitude,

                currentStop,

                nextStop

            } = req.body;



            const location =
                await BusLocation.create({

                    busId,

                    latitude,

                    longitude,

                    speed,

                    heading,

                    accuracy,

                    altitude,

                    currentStop,

                    nextStop

                });



            // update latest location in Bus model

            await Bus.findByIdAndUpdate(

                busId,

                {

                    lastLatitude:
                        latitude,


                    lastLongitude:
                        longitude,


                    speed:
                        speed || 0,


                    lastUpdated:
                        new Date()

                }

            );



            res.status(201).json({

                success: true,

                message:
                    "Bus Location Saved",

                data: location

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };








// =====================================
// GET ALL LOCATION
// =====================================

exports.getLocations =
    async (req, res) => {


        try {


            const data =
                await BusLocation.find()


                    .populate(

                        "busId",

                        "busNumber busName"

                    )


                    .sort({

                        createdAt: -1

                    });



            res.status(200).json({

                success: true,

                count: data.length,

                data: data

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };







// =====================================
// GET LATEST LOCATION OF BUS
// =====================================

exports.getLatestLocation =
    async (req, res) => {


        try {


            const location =
                await BusLocation.findOne({

                    busId:
                        req.params.busId

                })

                    .sort({

                        timestamp: -1

                    })


                    .populate(

                        "busId",

                        "busNumber busName"

                    );



            if (!location) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Location Not Found"

                });


            }



            res.status(200).json({

                success: true,

                data: location

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };








// =====================================
// TRACKING HISTORY
// =====================================

exports.getTrackingHistory =
    async (req, res) => {


        try {


            const data =
                await BusLocation.find({

                    busId:
                        req.params.busId

                })

                    .sort({

                        timestamp: 1

                    });



            res.status(200).json({

                success: true,

                count: data.length,

                data: data

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };








// =====================================
// DELETE LOCATION
// =====================================

exports.deleteLocation =
    async (req, res) => {


        try {


            await BusLocation.findByIdAndDelete(

                req.params.id

            );


            res.status(200).json({

                success: true,

                message:
                    "Location Deleted"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };