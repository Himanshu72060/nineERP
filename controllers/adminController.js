const User =
    require("../models/User");


// ADMIN PROFILE

exports.getProfile =
    async (req, res) => {

        const admin =
            await User.findById(
                req.user.id
            ).select(
                "-password"
            );

        res.json({
            success: true,
            data: admin
        });

    };


// UPDATE PROFILE

exports.updateProfile =
    async (req, res) => {

        const admin =
            await User.findByIdAndUpdate(

                req.user.id,

                req.body,

                {
                    new: true
                }

            ).select(
                "-password"
            );

        res.json({

            success: true,

            message:
                "Profile Updated",

            data: admin

        });

    };


// ALL STUDENTS

exports.getAllStudents =
    async (req, res) => {

        const students =
            await User.find({

                role:
                    "student"

            }).select(
                "-password"
            );

        res.json({

            success: true,

            count:
                students.length,

            data:
                students

        });

    };


// ALL TEACHERS

exports.getAllTeachers =
    async (req, res) => {

        const teachers =
            await User.find({

                role:
                    "teacher"

            }).select(
                "-password"
            );

        res.json({

            success: true,

            count:
                teachers.length,

            data:
                teachers

        });

    };


// DELETE USER

exports.deleteUser =
    async (req, res) => {

        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User Not Found"

            });

        }

        await user.deleteOne();

        res.json({

            success: true,

            message:
                "User Deleted"

        });

    };