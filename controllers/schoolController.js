const School = require("../models/School");
const User = require("../models/User");


// ======================================
// GET ALL SCHOOLS
// ======================================

exports.getAllSchools = async (req, res) => {

    try {

        const schools = await School.find()
            .populate(
                "principalId",
                "fullName email phone status"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: schools.length,

            data: schools

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// GET SCHOOL BY ID
// ======================================

exports.getSchoolById = async (req, res) => {

    try {

        const school = await School.findById(
            req.params.id
        ).populate(
            "principalId",
            "fullName email phone status"
        );

        if (!school) {

            return res.status(404).json({

                success: false,

                message: "School not found"

            });

        }

        res.status(200).json({

            success: true,

            data: school

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// APPROVE SCHOOL
// ======================================

exports.approveSchool = async (req, res) => {

    try {

        const school = await School.findById(
            req.params.id
        );

        if (!school) {

            return res.status(404).json({

                success: false,

                message: "School not found"

            });

        }

        school.status = "approved";

        school.approvedBy = req.user.id;

        school.approvedAt = new Date();

        await school.save();

        if (school.principalId) {

            await User.findByIdAndUpdate(

                school.principalId,

                {
                    status: "approved",
                    schoolId: school._id
                }

            );

        }

        res.status(200).json({

            success: true,

            message:
                "School approved successfully",

            data: school

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// REJECT SCHOOL
// ======================================

exports.rejectSchool = async (req, res) => {

    try {

        const { rejectionReason } = req.body;

        const school = await School.findById(
            req.params.id
        );

        if (!school) {

            return res.status(404).json({

                success: false,

                message: "School not found"

            });

        }

        school.status = "rejected";

        school.rejectionReason =
            rejectionReason || "";

        await school.save();

        if (school.principalId) {

            await User.findByIdAndUpdate(

                school.principalId,

                {
                    status: "rejected"
                }

            );

        }

        res.status(200).json({

            success: true,

            message:
                "School rejected successfully",

            data: school

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// SUSPEND SCHOOL
// ======================================

exports.suspendSchool = async (req, res) => {

    try {

        const school = await School.findById(
            req.params.id
        );

        if (!school) {

            return res.status(404).json({

                success: false,

                message: "School not found"

            });

        }

        school.status = "suspended";

        await school.save();

        if (school.principalId) {

            await User.findByIdAndUpdate(

                school.principalId,

                {
                    status: "suspended"
                }

            );

        }

        res.status(200).json({

            success: true,

            message:
                "School suspended successfully",

            data: school

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};