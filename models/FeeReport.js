const mongoose =
    require("mongoose");

const feeReportSchema =
    new mongoose.Schema(
        {

            studentName: {
                type: String,
                required: true
            },

            studentClass: {
                type: String,
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
                type: String,
                required: true
            },

            status: {
                type: String,
                enum: [
                    "Paid",
                    "Pending",
                    "Failed"
                ],
                default: "Pending"
            },

            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }

        },
        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "FeeReport",
        feeReportSchema
    );