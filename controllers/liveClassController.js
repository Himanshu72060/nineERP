const LiveClass =
    require("../models/LiveClass");

const cloudinary =
    require("../config/cloudinaryConfig");



// =====================================
// CREATE LIVE CLASS
// =====================================

exports.createLiveClass =
    async (req, res) => {

        try {

            let imageUrl = "";

            if (req.file) {

                const result =
                    await cloudinary.uploader.upload(

                        req.file.path,

                        {
                            folder: "live-classes"
                        }

                    );

                imageUrl =
                    result.secure_url;

            }


            const {

                subject,

                teacher,

                time,

                students,

                isLive,

                isTeacher,

                isSaved,

                liveId

            } = req.body;



            const liveClass =
                await LiveClass.create({

                    subject,

                    teacher,

                    time,

                    image: imageUrl,

                    students,

                    isLive,

                    isTeacher,

                    isSaved,

                    liveId

                });



            res.status(201).json({

                success: true,

                message:
                    "Live Class Created Successfully",

                data: liveClass

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// GET ALL LIVE CLASSES
// =====================================

exports.getLiveClasses =
    async (req, res) => {

        try {

            const liveClasses =
                await LiveClass.find()
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                success: true,

                count:
                    liveClasses.length,

                data:
                    liveClasses

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// GET SINGLE LIVE CLASS
// =====================================

exports.getLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findById(
                    req.params.id
                );


            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }


            res.status(200).json({

                success: true,

                data:
                    liveClass

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// UPDATE LIVE CLASS
// =====================================

exports.updateLiveClass =
    async (req, res) => {

        try {

            let updateData =
                { ...req.body };


            if (req.file) {

                const result =
                    await cloudinary.uploader.upload(

                        req.file.path,

                        {
                            folder: "live-classes"
                        }

                    );

                updateData.image =
                    result.secure_url;

            }



            const liveClass =
                await LiveClass.findByIdAndUpdate(

                    req.params.id,

                    updateData,

                    {
                        new: true,
                        runValidators: true
                    }

                );



            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }



            res.status(200).json({

                success: true,

                message:
                    "Live Class Updated Successfully",

                data:
                    liveClass

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// DELETE LIVE CLASS
// =====================================

exports.deleteLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findByIdAndDelete(
                    req.params.id
                );


            if (!liveClass) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Live Class Not Found"

                });

            }


            res.status(200).json({

                success: true,

                message:
                    "Live Class Deleted Successfully"

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// START LIVE CLASS
// =====================================

exports.startLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findByIdAndUpdate(

                    req.params.id,

                    {
                        isLive: true
                    },

                    {
                        new: true
                    }

                );


            res.status(200).json({

                success: true,

                message:
                    "Live Class Started",

                data:
                    liveClass

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };




// =====================================
// END LIVE CLASS
// =====================================

exports.endLiveClass =
    async (req, res) => {

        try {

            const liveClass =
                await LiveClass.findByIdAndUpdate(

                    req.params.id,

                    {
                        isLive: false
                    },

                    {
                        new: true
                    }

                );


            res.status(200).json({

                success: true,

                message:
                    "Live Class Ended",

                data:
                    liveClass

            });


        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };