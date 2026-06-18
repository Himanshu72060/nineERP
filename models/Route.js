const mongoose =
    require("mongoose");

const routeSchema =
    new mongoose.Schema({

        routeName: {

            type: String,

            required: true,

            trim: true

        },

        routeCode: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },

        busId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Bus",

            default: null

        },

        schoolLocation: {

            latitude: {

                type: Number,

                required: true

            },

            longitude: {

                type: Number,

                required: true

            },

            address: {

                type: String,

                required: true

            }

        },

        stops: [

            {

                stopName: {

                    type: String,

                    required: true,

                    trim: true

                },

                latitude: {

                    type: Number,

                    required: true

                },

                longitude: {

                    type: Number,

                    required: true

                },

                pickupTime: {

                    type: String,

                    default: ""

                },

                studentsCount: {

                    type: Number,

                    default: 0

                }

            }

        ],

        allowedPath: [

            {

                latitude: {

                    type: Number

                },

                longitude: {

                    type: Number

                }

            }

        ],

        totalDistance: {

            type: Number,

            default: 0,

            min: 0

        },

        estimatedTime: {

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

        }

    },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "Route",
        routeSchema
    );