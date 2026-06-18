const mongoose =
    require("mongoose");


const driverSchema =
    new mongoose.Schema({

        userId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            default: null

        },


        driverName: {

            type: String,

            required: true,

            trim: true

        },


        phone: {

            type: String,

            required: true,

            trim: true

        },


        email: {

            type: String,

            default: ""

        },


        address: {

            type: String,

            default: ""

        },


        licenseNumber: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },


        licenseExpiry: {

            type: Date

        },


        experience: {

            type: Number,

            default: 0

        },


        driverImage: {

            type: String,

            default: ""

        },


        status: {

            type: String,

            enum: [

                "Active",

                "Inactive"

            ],

            default: "Active"

        },


        assignedBus: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Bus",

            default: null

        }


    },

        {

            timestamps: true

        });


module.exports =
    mongoose.model(
        "Driver",
        driverSchema
    );