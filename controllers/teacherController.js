const bcrypt = require("bcryptjs");

const User =
    require("../models/User");

const uploadToCloudinary =
    require("../utils/uploadToCloudinary");

const generateToken =
    require("../utils/generateToken");


// =====================================
// CREATE TEACHER
// =====================================

exports.createTeacher =
    async (req, res) => {

        try {

            const {

                fullName,

                email,

                phone,

                password,

                teacherId,

                department,

                specialization,

                experienceYear

            } = req.body;

            if (

                !fullName ||
                !email ||
                !phone ||
                !password ||
                !teacherId

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Required fields missing"

                });

            }

            const existingTeacher =
                await User.findOne({

                    $or: [

                        { email },

                        { teacherId }

                    ]

                });

            if (existingTeacher) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Teacher already exists"

                });

            }

            let teacherImage = "";

            if (req.file) {

                const uploaded =
                    await uploadToCloudinary(

                        req.file.buffer,

                        "teachers"

                    );

                teacherImage =
                    uploaded.secure_url;

            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const teacher =
                await User.create({

                    schoolId:
                        req.user.schoolId,

                    role:
                        "teacher",

                    fullName,

                    email,

                    phone,

                    password:
                        hashedPassword,

                    teacherId,

                    department,

                    specialization,

                    experienceYear,

                    teacherImage,

                    status:
                        "approved"

                });

            res.status(201).json({

                success: true,

                message:
                    "Teacher created successfully",

                data: teacher

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
// TEACHER LOGIN
// =====================================

exports.teacherLogin =
    async (req, res) => {

        try {

            const {

                email,

                password

            } = req.body;

            const teacher =
                await User.findOne({

                    email,

                    role: "teacher"

                });

            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found"

                });

            }

            const isMatch =
                await bcrypt.compare(

                    password,

                    teacher.password

                );

            if (!isMatch) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid credentials"

                });

            }

            const token =
                generateToken(
                    teacher
                );

            res.status(200).json({

                success: true,

                message:
                    "Login successful",

                token,

                data: teacher

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
// GET ALL TEACHERS
// =====================================

exports.getAllTeachers =
    async (req, res) => {

        try {

            const teachers =
                await User.find({

                    role:
                        "teacher",

                    schoolId:
                        req.user.schoolId

                });

            res.status(200).json({

                success: true,

                count:
                    teachers.length,

                data:
                    teachers

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
// GET TEACHER BY ID
// =====================================

exports.getTeacherById =
    async (req, res) => {

        try {

            const teacher =
                await User.findOne({

                    _id:
                        req.params.id,

                    role:
                        "teacher"

                });

            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    teacher

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
// DELETE TEACHER
// =====================================

exports.deleteTeacher =
    async (req, res) => {

        try {

            const teacher =
                await User.findOneAndDelete({

                    _id:
                        req.params.id,

                    role:
                        "teacher"

                });

            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Teacher deleted successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };