const Admission =
    require("../models/Admission");



// CREATE

exports.createAdmission =
    async (req, res) => {

        try {


            const admission =
                await Admission.create({

                    schoolId:
                        req.user.schoolId,

                    ...req.body

                });


            res.status(201).json({

                success: true,

                message:
                    "Admission Created Successfully",

                data: admission

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }


    };




// GET ALL

exports.getAdmissions =
    async (req, res) => {


        try {


            const admissions =
                await Admission.find({

                    schoolId:
                        req.user.schoolId

                })
                    .sort({
                        createdAt: -1
                    });



            res.status(200).json({

                success: true,

                count:
                    admissions.length,

                data: admissions

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }


    };




// GET ONE

exports.getAdmission =
    async (req, res) => {


        try {


            const admission =
                await Admission.findOne({

                    _id: req.params.id,

                    schoolId: req.user.schoolId

                });



            if (!admission) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Admission Not Found"

                });

            }



            res.status(200).json({

                success: true,

                data: admission

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }


    };




// UPDATE

exports.updateAdmission =
    async (req, res) => {


        try {


            const admission =
                await Admission.findOneAndUpdate({

                    _id: req.params.id,

                    schoolId: req.user.schoolId

                },

                    req.body,

                    {

                        new: true

                    });


            res.status(200).json({

                success: true,

                message:
                    "Admission Updated Successfully",

                data: admission

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };




// DELETE

exports.deleteAdmission =
    async (req, res) => {


        try {


            await Admission.findOneAndDelete({

                _id: req.params.id,

                schoolId: req.user.schoolId

            });



            res.status(200).json({

                success: true,

                message:
                    "Admission Deleted Successfully"

            });


        } catch (error) {


            res.status(500).json({

                success: false,

                message: error.message

            });


        }


    };