const TimeTable =
    require("../models/timeTableModel");


// =====================================
// CREATE TIMETABLE
// =====================================

exports.createTimeTable =
    async (req, res) => {

        try {

            const timeTable =
                await TimeTable.create(
                    req.body
                );

            res.status(201).json({

                success: true,

                message:
                    "Time Table Created Successfully",

                data:
                    timeTable

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
// GET ALL TIMETABLES
// =====================================

exports.getTimeTables =
    async (req, res) => {

        try {

            const timeTables =
                await TimeTable.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                count:
                    timeTables.length,

                data:
                    timeTables

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
// GET SINGLE TIMETABLE
// =====================================

exports.getTimeTable =
    async (req, res) => {

        try {

            const timeTable =
                await TimeTable.findById(
                    req.params.id
                );

            if (!timeTable) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Time Table Not Found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    timeTable

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
// GET CLASS TIMETABLE
// =====================================

exports.getClassTimeTable =
    async (req, res) => {

        try {

            const timeTables =
                await TimeTable.find({

                    classId:
                        req.params.classId

                });

            res.status(200).json({

                success: true,

                count:
                    timeTables.length,

                data:
                    timeTables

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
// UPDATE TIMETABLE
// =====================================

exports.updateTimeTable =
    async (req, res) => {

        try {

            const timeTable =
                await TimeTable.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true,
                        runValidators: true
                    }

                );

            if (!timeTable) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Time Table Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Time Table Updated Successfully",

                data:
                    timeTable

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
// DELETE TIMETABLE
// =====================================

exports.deleteTimeTable =
    async (req, res) => {

        try {

            const timeTable =
                await TimeTable.findByIdAndDelete(
                    req.params.id
                );

            if (!timeTable) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Time Table Not Found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Time Table Deleted Successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };
