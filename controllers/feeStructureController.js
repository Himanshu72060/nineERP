const FeeStructure =
    require("../models/FeeStructure");


// =====================================
// CREATE FEE STRUCTURE
// =====================================

exports.createFeeStructure =
    async (req, res) => {

        try {


            const feeStructure =
                await FeeStructure.create(
                    req.body
                );


            res.status(201).json({

                success: true,

                message:
                    "Fee Structure Created Successfully",

                data:
                    feeStructure

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }

    };




// =====================================
// GET ALL FEE STRUCTURE
// =====================================

exports.getFeeStructures =
    async (req, res) => {


        try {


            const feeStructures =
                await FeeStructure.find()
                    .sort({

                        createdAt: -1

                    });



            res.status(200).json({

                success: true,

                count:
                    feeStructures.length,

                data:
                    feeStructures

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }


    };




// =====================================
// GET SINGLE FEE STRUCTURE
// =====================================

exports.getFeeStructure =
    async (req, res) => {


        try {


            const feeStructure =
                await FeeStructure.findById(
                    req.params.id
                );



            if (!feeStructure) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });


            }



            res.status(200).json({

                success: true,

                data:
                    feeStructure

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }


    };




// =====================================
// UPDATE FEE STRUCTURE
// =====================================

exports.updateFeeStructure =
    async (req, res) => {


        try {


            const feeStructure =
                await FeeStructure.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {

                        new: true,

                        runValidators: true

                    }

                );



            if (!feeStructure) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Fee Structure Updated Successfully",

                data:
                    feeStructure

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }


    };




// =====================================
// DELETE FEE STRUCTURE
// =====================================

exports.deleteFeeStructure =
    async (req, res) => {


        try {


            const feeStructure =
                await FeeStructure.findByIdAndDelete(

                    req.params.id

                );



            if (!feeStructure) {


                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Structure Not Found"

                });


            }



            res.status(200).json({

                success: true,

                message:
                    "Fee Structure Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }


    };