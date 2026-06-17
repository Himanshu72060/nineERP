const Attendance =
    require("../models/Attendance");


// =====================================
// CREATE ATTENDANCE
// =====================================

exports.createAttendance =
    async (req, res) => {

        try {


            const attendance =
                await Attendance.create(
                    req.body
                );


            res.status(201).json({

                success: true,

                message:
                    "Attendance Created Successfully",

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

exports.getAttendances =
    async (req, res) => {


        try {


            const attendance =
                await Attendance.find()
                    .sort({
                        createdAt: -1
                    });



            res.status(200).json({

                success: true,

                count:
                    attendance.length,

                data:
                    attendance

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// =====================================
// GET SINGLE ATTENDANCE
// =====================================

exports.getAttendance =
    async (req, res) => {


        try {


            const attendance =
                await Attendance.findById(
                    req.params.id
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
// UPDATE ATTENDANCE
// =====================================

exports.updateAttendance =
    async (req, res) => {


        try {


            const attendance =
                await Attendance.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
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
                    "Attendance Updated Successfully",

                data:
                    attendance

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


            const attendance =
                await Attendance.findByIdAndDelete(
                    req.params.id
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
                    "Attendance Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// =====================================
// STUDENT EXIT
// =====================================

exports.studentExit =
    async (req, res) => {


        try {


            const attendance =
                await Attendance.findByIdAndUpdate(

                    req.params.id,

                    {

                        exitTime:
                            new Date().toLocaleTimeString(),

                        isInsideCampus: false

                    },

                    {
                        new: true
                    }


                );



            res.status(200).json({

                success: true,

                message:
                    "Student Exit Marked",

                data:
                    attendance

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };