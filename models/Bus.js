const mongoose =
    require("mongoose");

const busSchema =
    new mongoose.Schema({

        busNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        busName: {
            type: String,
            trim: true
        },

        driverId: {
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

        driverPhone: {
            type: String,
            required: true,
            trim: true
        },

        helperName: {
            type: String,
            default: "",
            trim: true
        },

        helperPhone: {
            type: String,
            default: "",
            trim: true
        },

        routeId: {
            type:
                mongoose.Schema.Types.ObjectId,
            ref: "Route",
            default: null
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        currentStudents: {
            type: Number,
            default: 0,
            min: 0
        },

        busImage: {
            type: String,
            default: ""
        },

        gpsDeviceId: {
            type: String,
            default: ""
        },

        status: {

            type: String,

            enum: [
                "Active",
                "Inactive",
                "Maintenance"
            ],

            default: "Active"

        },

        tripStatus: {

            type: String,

            enum: [
                "Not Started",
                "Running",
                "Completed"
            ],

            default: "Not Started"

        },

        lastLatitude: {
            type: Number,
            default: 0
        },

        lastLongitude: {
            type: Number,
            default: 0
        },

        speed: {
            type: Number,
            default: 0
        },

        lastUpdated: {
            type: Date,
            default: Date.now
        }

    },

        {
            timestamps: true
        }

    );

module.exports =
    mongoose.model(
        "Bus",
        busSchema
    );