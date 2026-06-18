const mongoose =
    require("mongoose");


const busFeeSchema =
    new mongoose.Schema({


        studentId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        studentName: {

            type: String,

            required: true

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


        amount: {

            type: Number,

            required: true

        },


        month: {

            type: String,

            required: true

        },


        paymentDate: {

            type: Date

        },


        paymentMethod: {

            type: String,

            enum: [

                "Cash",

                "Online",

                "UPI",

                "Card"

            ],

            default: "Cash"

        },


        status: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Failed"

            ],

            default: "Pending"

        },


        transactionId: {

            type: String,

            default: ""

        }


    },

        {

            timestamps: true

        });


module.exports =
    mongoose.model(
        "BusFee",
        busFeeSchema
    );