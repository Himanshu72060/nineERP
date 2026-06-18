const mongoose =
    require("mongoose");


const busLocationSchema =
    new mongoose.Schema({


        busId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Bus",

            required: true

        },


        latitude: {

            type: Number,

            required: true

        },


        longitude: {

            type: Number,

            required: true

        },


        speed: {

            type: Number,

            default: 0

        },


        heading: {

            type: Number,

            default: 0

        },


        accuracy: {

            type: Number,

            default: 0

        },


        altitude: {

            type: Number,

            default: 0

        },


        isRouteDeviation: {

            type: Boolean,

            default: false

        },


        deviationDistance: {

            type: Number,

            default: 0

        },


        currentStop: {

            type: String,

            default: ""

        },


        nextStop: {

            type: String,

            default: ""

        },


        timestamp: {

            type: Date,

            default: Date.now

        }


    },

        {

            timestamps: true

        });



busLocationSchema.index(
    {
        busId: 1,
        timestamp: -1
    }
);



module.exports =
    mongoose.model(
        "BusLocation",
        busLocationSchema
    );