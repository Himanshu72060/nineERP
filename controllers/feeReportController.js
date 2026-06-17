const FeeReport =
    require("../models/FeeReport");



// =====================================
// CREATE FEE REPORT
// =====================================

exports.createFeeReport =
    async (req, res) => {

        try {


            const feeReport =
                await FeeReport.create({

                    ...req.body,

                    userId:
                        req.user.id

                });


            res.status(201).json({

                success: true,

                message:
                    "Fee Report Created Successfully",

                data:
                    feeReport

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
// GET ALL FEE REPORTS
// =====================================

exports.getFeeReports =
    async (req, res) => {


        try {


            const reports =
                await FeeReport.find()

                    .populate(
                        "userId",
                        "fullName email phone"
                    )

                    .sort({
                        createdAt: -1
                    });



            res.status(200).json({

                success: true,

                count:
                    reports.length,

                data:
                    reports

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
// GET SINGLE FEE REPORT
// =====================================

exports.getFeeReport =
    async (req, res) => {


        try {


            const report =
                await FeeReport.findById(
                    req.params.id
                )

                    .populate(
                        "userId",
                        "fullName email phone"
                    );



            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }



            res.status(200).json({

                success: true,

                data:
                    report

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
// UPDATE FEE REPORT
// =====================================

exports.updateFeeReport =
    async (req, res) => {


        try {


            const report =
                await FeeReport.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }

                );



            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }



            res.status(200).json({

                success: true,

                message:
                    "Fee Report Updated Successfully",

                data:
                    report

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
// DELETE FEE REPORT
// =====================================

exports.deleteFeeReport =
    async (req, res) => {


        try {


            const report =
                await FeeReport.findByIdAndDelete(
                    req.params.id
                );



            if (!report) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Fee Report Not Found"

                });

            }



            res.status(200).json({

                success: true,

                message:
                    "Fee Report Deleted Successfully"

            });



        } catch (error) {


            res.status(500).json({

                success: false,

                message:
                    error.message

            });


        }


    };