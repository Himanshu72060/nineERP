const ReportCard =
    require("../models/ReportCard");


// =====================================
// CREATE REPORT CARD
// =====================================

exports.createReportCard =
    async (req, res) => {

        try {

            const reportCard =
                await ReportCard.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Report Card Created Successfully",

                data:
                    reportCard

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
// GET ALL REPORT CARDS
// =====================================

exports.getReportCards =
    async (req, res) => {

        try {

            const reportCards =
                await ReportCard.find()

                    .populate(
                        "studentId",
                        "fullName email phone"
                    )

                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    reportCards.length,

                data:
                    reportCards

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
// GET SINGLE REPORT CARD
// =====================================

exports.getReportCard =
    async (req, res) => {

        try {

            const reportCard =
                await ReportCard.findById(
                    req.params.id
                )

                    .populate(
                        "studentId",
                        "fullName email phone"
                    );

            if (!reportCard) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report Card Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    reportCard

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
// UPDATE REPORT CARD
// =====================================

exports.updateReportCard =
    async (req, res) => {

        try {

            const reportCard =
                await ReportCard.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }

                );

            if (!reportCard) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report Card Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Report Card Updated Successfully",

                data:
                    reportCard

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
// DELETE REPORT CARD
// =====================================

exports.deleteReportCard =
    async (req, res) => {

        try {

            const reportCard =
                await ReportCard.findByIdAndDelete(
                    req.params.id
                );

            if (!reportCard) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Report Card Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Report Card Deleted Successfully"

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
// GET REPORT CARD BY STUDENT ID
// =====================================

exports.getStudentReportCards =
    async (req, res) => {

        try {

            const reportCards =
                await ReportCard.find({

                    studentId:
                        req.params.studentId

                });

            res.status(200).json({

                success: true,

                count:
                    reportCards.length,

                data:
                    reportCards

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };