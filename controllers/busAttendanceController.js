const BusAttendance =
    require("../models/BusAttendance");




// =====================================
// MARK BOARDING
// =====================================

exports.markBoarding =
    async (req, res) => {


        try {


            const attendance =
                await BusAttendance.create({

                    ...req.body,

                    status: "Boarded",

                    boardingTime:
                        new Date()

                });



            res.status(201).json({

                success: true,

                message:
                    "Student Boarded Successfully",

                data: attendance

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };





// =====================================
// MARK DROP
// =====================================

exports.markDrop =
    async (req, res) => {


        try {


            const attendance =
                await BusAttendance.findByIdAndUpdate(

                    req.params.id,

                    {

                        status: "Dropped",

                        dropTime:
                            new Date(),

                        dropLocation:
                            req.body.dropLocation

                    },

                    {
                        new: true
                    }

                );



            if (!attendance) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Attendance Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Student Dropped Successfully",

                data: attendance

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };







// =====================================
// GET ALL ATTENDANCE
// =====================================

exports.getAttendance =
    async (req, res) => {


        try {


            const data =
                await BusAttendance.find()


                    .populate(
                        "busId",
                        "busNumber"
                    )


                    .populate(
                        "routeId",
                        "routeName"
                    )


                    .populate(
                        "markedBy",
                        "fullName"
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
// GET ATTENDANCE BY STUDENT
// =====================================

exports.getStudentAttendance =
    async (req, res) => {


        try {


            const data =
                await BusAttendance.find({

                    studentId:
                        req.params.studentId

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
// GET ATTENDANCE BY BUS
// =====================================

exports.getBusAttendance =
    async (req, res) => {


        try {


            const data =
                await BusAttendance.find({

                    busId:
                        req.params.busId

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
// GET BY DATE
// =====================================


exports.getAttendanceByDate =
    async (req, res) => {


        try {


            const data =
                await BusAttendance.find({

                    date:
                        req.params.date

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
// DELETE ATTENDANCE
// =====================================


exports.deleteAttendance =
    async (req, res) => {


        try {


            await BusAttendance.findByIdAndDelete(

                req.params.id

            );



            res.status(200).json({

                success: true,

                message:
                    "Attendance Deleted"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };