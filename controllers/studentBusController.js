const StudentBus =
    require("../models/StudentBus");

const Bus =
    require("../models/Bus");



// =====================================
// ASSIGN STUDENT TO BUS
// =====================================

exports.assignStudentBus =
    async (req, res) => {


        try {


            const {

                busId

            } = req.body;



            const bus =
                await Bus.findById(
                    busId
                );



            if (!bus) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Bus Not Found"

                });


            }



            if (
                bus.currentStudents >=
                bus.capacity
            ) {


                return res.status(400).json({

                    success: false,

                    message:
                        "Bus Capacity Full"

                });


            }



            const studentBus =
                await StudentBus.create(

                    req.body

                );



            await Bus.findByIdAndUpdate(

                busId,

                {

                    $inc: {
                        currentStudents: 1
                    }

                }

            );



            res.status(201).json({

                success: true,

                message:
                    "Student Assigned To Bus",

                data: studentBus

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };






// =====================================
// GET ALL STUDENT BUS
// =====================================

exports.getStudentBus =
    async (req, res) => {


        try {


            const data =
                await StudentBus.find()


                    .populate(
                        "busId",
                        "busNumber busName"
                    )


                    .populate(
                        "routeId",
                        "routeName routeCode"
                    )


                    .populate(
                        "studentId",
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
// GET SINGLE
// =====================================


exports.getStudentBusById =
    async (req, res) => {


        try {


            const data =
                await StudentBus.findById(

                    req.params.id

                )

                    .populate("busId")

                    .populate("routeId")

                    .populate("studentId");



            if (!data) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Record Not Found"

                });


            }



            res.status(200).json({

                success: true,

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
// UPDATE STUDENT BUS
// =====================================


exports.updateStudentBus =
    async (req, res) => {


        try {


            const data =
                await StudentBus.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Updated Successfully",

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
// DELETE ASSIGNMENT
// =====================================


exports.deleteStudentBus =
    async (req, res) => {


        try {


            const data =
                await StudentBus.findByIdAndDelete(

                    req.params.id

                );



            if (data) {


                await Bus.findByIdAndUpdate(

                    data.busId,

                    {

                        $inc: {
                            currentStudents: -1
                        }

                    }

                );


            }



            res.status(200).json({

                success: true,

                message:
                    "Student Removed From Bus"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };







// =====================================
// GET STUDENTS BY BUS
// =====================================


exports.getStudentsByBus =
    async (req, res) => {


        try {


            const students =
                await StudentBus.find({

                    busId:
                        req.params.busId

                })

                    .populate(
                        "studentId"
                    );



            res.status(200).json({

                success: true,

                count:
                    students.length,

                data: students

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };






// =====================================
// GET BUS BY STUDENT
// =====================================


exports.getBusByStudent =
    async (req, res) => {


        try {


            const data =
                await StudentBus.findOne({

                    studentId:
                        req.params.studentId

                })


                    .populate(
                        "busId"
                    )


                    .populate(
                        "routeId"
                    );



            res.status(200).json({

                success: true,

                data: data

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };