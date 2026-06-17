const bcrypt = require("bcryptjs");
const User = require("../models/User");
const School = require("../models/School");
const generateToken = require("../utils/generateToken");



// =======================================
// SUPER ADMIN SIGNUP
// =======================================

exports.superAdminSignup =
    async (req, res) => {

        try {

            const {
                fullName,
                email,
                phone,
                password
            } = req.body;

            if (
                !fullName ||
                !email ||
                !phone ||
                !password
            ) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            const superAdminExists =
                await User.findOne({
                    role: "superadmin"
                });

            if (superAdminExists) {
                return res.status(400).json({
                    success: false,
                    message: "Super Admin already exists"
                });
            }

            const existingEmail =
                await User.findOne({ email });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            const superAdmin =
                await User.create({

                    role: "superadmin",

                    fullName,

                    email,

                    phone,

                    password: hashedPassword,

                    status: "approved"
                });

            const token =
                generateToken(superAdmin);

            res.status(201).json({

                success: true,

                message:
                    "Super Admin Created Successfully",

                token,

                data: superAdmin
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message
            });

        }

    };


// =======================================
// SUPER ADMIN LOGIN
// =======================================

exports.superAdminLogin =
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const user =
                await User.findOne({

                    email,

                    role: "superadmin"

                });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Super Admin not found"
                });
            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid credentials"
                });
            }

            user.lastLogin =
                new Date();

            await user.save();

            const token =
                generateToken(user);

            res.status(200).json({

                success: true,

                message:
                    "Login Successful",

                token,

                data: user
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message
            });

        }

    };


// =======================================
// SCHOOL SIGNUP
// =======================================

exports.schoolSignup =
    async (req, res) => {

        try {

            const {

                schoolName,

                schoolNumber,

                email,

                phone,

                password,

                board,

                address,

                city,

                state,

                pincode,

                principalName,

                principalEmail,

                principalPhone,

                principalPassword

            } = req.body;

            if (

                !schoolName ||
                !schoolNumber ||
                !email ||
                !phone ||
                !password ||
                !board ||
                !address ||
                !city ||
                !state ||
                !pincode ||
                !principalName ||
                !principalEmail ||
                !principalPhone ||
                !principalPassword

            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "All fields are required"
                });
            }

            const schoolExists =
                await School.findOne({
                    $or: [
                        { email },
                        { schoolNumber }
                    ]
                });

            if (schoolExists) {
                return res.status(400).json({
                    success: false,
                    message:
                        "School already exists"
                });
            }

            const principalExists =
                await User.findOne({
                    email: principalEmail
                });

            if (principalExists) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Principal email already exists"
                });
            }

            const schoolPassword =
                await bcrypt.hash(
                    password,
                    10
                );

            const school =
                await School.create({

                    schoolName,

                    schoolNumber,

                    email,

                    phone,

                    password:
                        schoolPassword,

                    board,

                    address,

                    city,

                    state,

                    pincode,

                    principalName,

                    principalEmail,

                    principalPhone
                });

            const principalHash =
                await bcrypt.hash(
                    principalPassword,
                    10
                );

            const principal =
                await User.create({

                    schoolId:
                        school._id,

                    role:
                        "principal",

                    fullName:
                        principalName,

                    email:
                        principalEmail,

                    phone:
                        principalPhone,

                    password:
                        principalHash,

                    status:
                        "pending"
                });

            school.principalId =
                principal._id;

            await school.save();

            res.status(201).json({

                success: true,

                message:
                    "School Registered Successfully. Waiting For Approval.",

                school,

                principal
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message
            });

        }

    };


// =======================================
// SCHOOL LOGIN
// =======================================

exports.schoolLogin =
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const school =
                await School.findOne({
                    email
                });

            if (!school) {
                return res.status(404).json({
                    success: false,
                    message:
                        "School not found"
                });
            }

            if (
                school.status !==
                "approved"
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        `School status is ${school.status}`
                });
            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    school.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid credentials"
                });
            }

            const token =
                generateToken({
                    _id: school._id,
                    role: "school"
                });

            res.status(200).json({

                success: true,

                message:
                    "Login Successful",

                token,

                data: school
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message
            });

        }

    };


// =======================================
// PRINCIPAL LOGIN
// =======================================

exports.principalLogin =
    async (req, res) => {

        try {

            const {
                email,
                password
            } = req.body;

            const principal =
                await User.findOne({

                    email,

                    role: "principal"

                });

            if (!principal) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Principal not found"
                });
            }

            if (
                principal.status !==
                "approved"
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        `Principal status is ${principal.status}`
                });
            }

            const isMatch =
                await bcrypt.compare(
                    password,
                    principal.password
                );

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid credentials"
                });
            }

            principal.lastLogin =
                new Date();

            await principal.save();

            const token =
                generateToken(
                    principal
                );

            res.status(200).json({

                success: true,

                message:
                    "Login Successful",

                token,

                data: principal
            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message
            });

        }

    };