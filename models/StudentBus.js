const mongoose =
    require("mongoose");


const studentBusSchema =
    new mongoose.Schema({

        studentId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        studentName: {

            type: String,

            required: true,

            trim: true

        },


        parentName: {

            type: String,

            default: ""

        },


        parentPhone: {

            type: String,

            default: ""

        },


        busId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Bus",

            required: true

        },


        routeId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Route",

            required: true

        },


        className: {

            type: String,

            required: true

        },


        pickupStop: {


            stopName: {

                type: String,

                required: true

            },


            latitude: {

                type: Number,

                required: true

            },


            longitude: {

                type: Number,

                required: true

            }


        },


        dropStop: {


            stopName: {

                type: String,

                required: true

            },


            latitude: {

                type: Number,

                required: true

            },


            longitude: {

                type: Number,

                required: true

            }


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

        });



studentBusSchema.index(
    {
        studentId: 1
    },
    {
        unique: true
    }
);



module.exports =
    mongoose.model(
        "StudentBus",
        studentBusSchema
    );