const bcrypt = require("bcryptjs");

const User =
    require("../models/User");


// =====================================
// GET MY PROFILE
// =====================================

exports.getMyProfile =
    async (req, res) => {

        try {

            const user =
                await User.findById(
                    req.user.id
                ).select("-password");

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found"

                });

            }

            res.status(200).json({

                success: true,

                data: user

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
// UPDATE PROFILE
// =====================================

exports.updateProfile =
    async (req, res) => {

        try {

            const {

                fullName,

                phone

            } = req.body;

            const user =
                await User.findByIdAndUpdate(

                    req.user.id,

                    {
                        fullName,
                        phone
                    },

                    {
                        new: true
                    }

                ).select("-password");

            res.status(200).json({

                success: true,

                message:
                    "Profile updated successfully",

                data: user

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
// CHANGE PASSWORD
// =====================================

exports.changePassword =
    async (req, res) => {

        try {

            const {

                oldPassword,

                newPassword

            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        "User not found"

                });

            }

            const isMatch =
                await bcrypt.compare(

                    oldPassword,

                    user.password

                );

            if (!isMatch) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Old password is incorrect"

                });

            }

            const hashedPassword =
                await bcrypt.hash(
                    newPassword,
                    10
                );

            user.password =
                hashedPassword;

            await user.save();

            res.status(200).json({

                success: true,

                message:
                    "Password changed successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };