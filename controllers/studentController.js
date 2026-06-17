const bcrypt = require("bcryptjs");

const User =
    require("../models/User");

const generateToken =
    require("../utils/generateToken");


// =====================================
// CREATE STUDENT
// =====================================

exports.createStudent =
    async (req, res) => {

        try {

            const {

                fullName,

                email,

                phone,

                password,

                studentId,

                rollNumber,

                className,

                section,

                parentName,

                admissionNumber

            } = req.body;

            if (

                !fullName ||
                !email ||
                !phone ||
                !password ||
                !studentId

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Required fields missing"

                });

            }

            const existingStudent =
                await User.findOne({

                    $or: [

                        { email },

                        { studentId }

                    ]

                });

            if (existingStudent) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Student already exists"

                });

            }

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const student =
                await User.create({

                    schoolId:
                        req.user.schoolId,

                    role:
                        "student",

                    fullName,

                    email,

                    phone,

                    password:
                        hashedPassword,

                    studentId,

                    rollNumber,

                    className,

                    section,

                    parentName,

                    admissionNumber,

                    status:
                        "approved"

                });

            res.status(201).json({

                success: true,

                message:
                    "Student created successfully",

                data:
                    student

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
// STUDENT LOGIN
// =====================================

exports.studentLogin =
    async (req, res) => {

        try {

            const {

                email,

                password

            } = req.body;

            const student =
                await User.findOne({

                    email,

                    role:
                        "student"

                });

            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }

            const isMatch =
                await bcrypt.compare(

                    password,

                    student.password

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
                    student
                );

            res.status(200).json({

                success: true,

                message:
                    "Login successful",

                token,

                data:
                    student

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
// GET ALL STUDENTS
// =====================================

exports.getAllStudents =
    async (req, res) => {

        try {

            const students =
                await User.find({

                    role:
                        "student",

                    schoolId:
                        req.user.schoolId

                });

            res.status(200).json({

                success: true,

                count:
                    students.length,

                data:
                    students

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
// GET STUDENT BY ID
// =====================================

exports.getStudentById =
    async (req, res) => {

        try {

            const student =
                await User.findOne({

                    _id:
                        req.params.id,

                    role:
                        "student"

                });

            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }

            res.status(200).json({

                success: true,

                data:
                    student

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
// UPDATE STUDENT
// =====================================

exports.updateStudent =
    async (req, res) => {

        try {

            const student =
                await User.findOneAndUpdate(

                    {

                        _id:
                            req.params.id,

                        role:
                            "student"

                    },

                    req.body,

                    {

                        new: true

                    }

                );

            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Student updated successfully",

                data:
                    student

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
// DELETE STUDENT
// =====================================

exports.deleteStudent =
    async (req, res) => {

        try {

            const student =
                await User.findOneAndDelete({

                    _id:
                        req.params.id,

                    role:
                        "student"

                });

            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found"

                });

            }

            res.status(200).json({

                success: true,

                message:
                    "Student deleted successfully"

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };