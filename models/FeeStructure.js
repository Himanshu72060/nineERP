const mongoose =
    require("mongoose");

const feeItemSchema =
    new mongoose.Schema({

        feeType: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        },

        dueDate: {
            type: String,
            required: true
        }

    });

const feeStructureSchema =
    new mongoose.Schema({

        classId: {
            type: String,
            required: true,
            unique: true
        },

        className: {
            type: String,
            required: true
        },

        frequency: {

            type: String,

            enum: [

                "Monthly",

                "Quarterly",

                "Half-Yearly",

                "Yearly",

                "One-Time"

            ],

            required: true

        },

        totalAmount: {
            type: Number,
            required: true
        },

        fees: [feeItemSchema],

        paymentStatus: {

            type: String,

            enum: [
                "Pending",
                "Paid",
                "Partial"
            ],

            default: "Pending"

        }

    },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "FeeStructure",
        feeStructureSchema
    );