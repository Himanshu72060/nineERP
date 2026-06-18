const BusFee =
    require("../models/BusFee");



// =====================================
// CREATE BUS FEE
// =====================================

exports.createBusFee =
    async (req, res) => {

        try {


            const fee =
                await BusFee.create(

                    req.body

                );


            res.status(201).json({

                success: true,

                message:
                    "Bus Fee Created Successfully",

                data: fee

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };







// =====================================
// GET ALL BUS FEES
// =====================================


exports.getBusFees =
    async (req, res) => {


        try {


            const fees =
                await BusFee.find()


                    .populate(

                        "studentId",

                        "fullName phone"

                    )


                    .populate(

                        "busId",

                        "busNumber busName"

                    )


                    .populate(

                        "routeId",

                        "routeName"

                    )


                    .sort({

                        createdAt: -1

                    });



            res.status(200).json({

                success: true,

                count: fees.length,

                data: fees

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };








// =====================================
// GET SINGLE FEE
// =====================================


exports.getBusFee =
    async (req, res) => {


        try {


            const fee =
                await BusFee.findById(

                    req.params.id

                )


                    .populate("studentId")

                    .populate("busId")

                    .populate("routeId");



            if (!fee) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Record Not Found"

                });


            }



            res.status(200).json({

                success: true,

                data: fee

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }

    };








// =====================================
// UPDATE BUS FEE
// =====================================


exports.updateBusFee =
    async (req, res) => {


        try {


            const fee =
                await BusFee.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {

                        new: true

                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Fee Updated Successfully",

                data: fee

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };








// =====================================
// DELETE BUS FEE
// =====================================


exports.deleteBusFee =
    async (req, res) => {


        try {


            await BusFee.findByIdAndDelete(

                req.params.id

            );



            res.status(200).json({

                success: true,

                message:
                    "Fee Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };








// =====================================
// GET STUDENT FEE HISTORY
// =====================================


exports.getStudentBusFee =
    async (req, res) => {


        try {


            const fees =
                await BusFee.find({

                    studentId:
                        req.params.studentId

                })

                    .sort({

                        createdAt: -1

                    });



            res.status(200).json({

                success: true,

                count: fees.length,

                data: fees

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };








// =====================================
// UPDATE PAYMENT STATUS
// =====================================


exports.updatePaymentStatus =
    async (req, res) => {


        try {


            const fee =
                await BusFee.findByIdAndUpdate(

                    req.params.id,

                    {

                        status:
                            req.body.status,


                        paymentDate:
                            new Date(),


                        transactionId:
                            req.body.transactionId || ""

                    },

                    {

                        new: true

                    }

                );



            res.status(200).json({

                success: true,

                message:
                    "Payment Status Updated",

                data: fee

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };